<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest\Api\Resource;

use Carbon\Carbon;
use Flarum\Api\Context as FlarumContext;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use Flarum\Api\Sort\SortColumn;
use Flarum\Notification\NotificationSyncer;
use Flarum\User\Event\Renamed;
use Flarum\User\Exception\NotAuthenticatedException;
use Flarum\User\User;
use Flarum\User\UserRepository;
use Flarum\User\UserValidator;
use FoF\UserRequest\Notification\RequestApprovedBlueprint;
use FoF\UserRequest\Notification\RequestRejectedBlueprint;
use FoF\UserRequest\UsernameRequest;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Tobyz\JsonApiServer\Context;

class UsernameRequestResource extends AbstractDatabaseResource
{
    public function __construct(
        protected UserValidator $validator,
        protected UserRepository $users,
        protected NotificationSyncer $notifications,
        protected Dispatcher $events
    ) {
    }

    public function type(): string
    {
        return 'username-requests';
    }

    public function model(): string
    {
        return UsernameRequest::class;
    }

    /**
     * Scope: moderators see only pending (Sent) requests; users see only their own.
     *
     * @param Builder<\Illuminate\Database\Eloquent\Model> $query
     * @param FlarumContext                                $context
     */
    public function scope(Builder $query, Context $context): void
    {
        $actor = $context->getActor();

        if ($actor->can('user.viewUsernameRequests')) {
            // Moderators: only pending requests needing moderation
            $query->where('status', 'Sent');
        } else {
            // Users: only their own requests
            $query->where('user_id', $actor->id);
        }
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Index::make()
                ->authenticated()
                ->can('user.viewUsernameRequests')
                ->paginate(20, 50)
                ->defaultInclude(['user'])
                ->defaultSort('-createdAt')
                ->eagerLoad(['user']),
            Endpoint\Create::make()
                ->authenticated()
                ->can('user.requestUsername')
                ->defaultInclude(['user']),
            Endpoint\Update::make()
                ->authenticated()
                ->visible(fn (UsernameRequest $request, FlarumContext $context) => $context->getActor()->can('user.viewUsernameRequests')),
            Endpoint\Delete::make()
                ->authenticated()
                ->visible(
                    fn (UsernameRequest $request, FlarumContext $context) => $context->getActor()->can('user.processUsernameRequests') ||
                    $request->user_id === $context->getActor()->id
                ),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Str::make('requestedUsername')
                ->property('requested_username')
                ->requiredOnCreate()
                ->writable()
                ->set(function (UsernameRequest $usernameRequest, ?string $username, FlarumContext $context) {
                    $actor = $context->getActor();
                    $body = $context->request->getParsedBody();
                    $forNickname = $body['data']['attributes']['forNickname'] ?? false;

                    $attr = $forNickname ? 'nickname' : 'username';

                    // Setting nickname to username by making nickname null so
                    // it falls back to username.
                    if ($forNickname && $username === $actor->username) {
                        $username = null;
                    }

                    // Allow for simply changing the case of a username, ie `user1` to `User1`
                    // The UserValidator will respond by saying `this username has already been taken`, so we bypass if the username is the same
                    if (Str::lower($actor->username) !== Str::lower($username)) {
                        $this->validator->assertValid([$attr => $username]);
                    }

                    $usernameRequest->requested_username = $username;
                }),

            Schema\Str::make('status')
                ->writable(fn () => true)
                ->set(function (UsernameRequest $usernameRequest, ?string $action, FlarumContext $context) {
                    $usernameRequest->status = $action;
                }),

            Schema\Str::make('reason')
                ->nullable()
                ->writable(fn () => true),

            Schema\Boolean::make('forNickname')
                ->property('for_nickname')
                ->writable(fn () => true)
                ->set(function (UsernameRequest $usernameRequest, bool $forNickname, FlarumContext $context) {
                    $usernameRequest->for_nickname = $forNickname;
                }),

            Schema\DateTime::make('createdAt')
                ->property('created_at'),

            Schema\Relationship\ToOne::make('user')
                ->type('users')
                ->includable()
                ->inverse('nameChangeRequests'),
        ];
    }

    public function sorts(): array
    {
        return [
            SortColumn::make('createdAt')
                ->column('created_at'),
        ];
    }

    /**
     * Return existing or new model for this user+type so setValues runs on the correct model.
     * The Create endpoint calls newModel before setValues - we must return our firstOrNew
     * model here, not in creating(), otherwise the populated model would be discarded.
     *
     * @param FlarumContext $context
     */
    public function newModel(Context $context): object
    {
        $actor = $context->getActor();

        // Password check and firstOrNew only for Create; Index/Update/Delete use newModel() for query building
        if (!$context->creating(self::class)) {
            return parent::newModel($context);
        }

        if ($actor->loginProviders()->count() === 0) {
            $body = $context->request->getParsedBody();
            $password = $body['meta']['password'] ?? null;
            if (!is_string($password) || !$actor->checkPassword($password)) {
                throw new NotAuthenticatedException();
            }
        }

        $body = $context->request->getParsedBody();
        $forNickname = $body['data']['attributes']['forNickname'] ?? false;

        // Find or create username request for this user and type
        $model = UsernameRequest::firstOrNew([
            'user_id'      => $actor->id,
            'for_nickname' => $forNickname,
        ]);

        $model->user_id = $actor->id;
        $model->status = 'Sent';
        $model->reason = null;
        $model->created_at = Carbon::now();

        return $model;
    }

    /**
     * @param FlarumContext $context
     */
    public function updating(object $model, Context $context): ?object
    {
        /** @var UsernameRequest $model */
        $actor = $context->getActor();
        $user = $this->users->findOrFail($model->user_id);

        if ($model->status === 'Approved') {
            $attr = $model->for_nickname ? 'nickname' : 'username';

            // Allow for simply changing the case of a username, ie `user1` to `User1`
            // The UserValidator will respond by saying `this username has already been taken`, so we bypass if the username is the same
            if (Str::lower($user->username) !== Str::lower($model->requested_username)) {
                $this->validator->assertValid([$attr => $model->requested_username]);
            }

            $oldUsername = null;

            if ($attr === 'username') {
                $usernameHistory = json_decode($user->username_history ?? '[]', true) ?: [];

                array_push($usernameHistory, [$user->username => time()]);
                $user->username_history = json_encode($usernameHistory);

                $oldUsername = $user->username;
            }

            /** @phpstan-ignore-next-line */
            $user->$attr = $model->requested_username;
            $user->save();

            if ($oldUsername) {
                $this->events->dispatch(new Renamed($user, $oldUsername, $actor));
            }
        }

        return $model;
    }

    /**
     * Send notifications after the model has been persisted.
     *
     * @param FlarumContext $context
     */
    public function updated(object $model, Context $context): ?object
    {
        /** @var UsernameRequest $model */
        $actor = $context->getActor();
        $user = $this->users->findOrFail($model->user_id);

        if ($model->status === 'Approved') {
            $this->notifications->sync(new RequestApprovedBlueprint($model, $actor), [$user]);
        } elseif ($model->status === 'Rejected') {
            $this->notifications->sync(new RequestRejectedBlueprint($model, $actor), [$user]);
        }

        return $model;
    }
}
