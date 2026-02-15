<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest;

use Flarum\Api\Resource\ForumResource;
use Flarum\Api\Resource\UserResource;
use Flarum\Extend;
use Flarum\User\User;
use FoF\UserRequest\Api\Resource\UsernameRequestResource;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->route('/u/{username}/history', 'username.history.view')
        ->route('/username-requests', 'username.request.view'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\ApiResource(UsernameRequestResource::class)),

    (new Extend\Model(User::class))
        ->cast('username_history', 'string')
        ->hasMany('nameChangeRequests', UsernameRequest::class, 'user_id')
        ->relationship('lastNicknameRequest', function ($user) {
            return $user->hasOne(UsernameRequest::class, 'user_id', null)->where('for_nickname', true);
        })
        ->relationship('lastUsernameRequest', function ($user) {
            return $user->hasOne(UsernameRequest::class, 'user_id', null)->where('for_nickname', false);
        }),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\ApiResource(UserResource::class))
        ->fields(fn () => [
            \Flarum\Api\Schema\Arr::make('usernameHistory')
                ->get(fn (User $user) => $user->username_history ? json_decode($user->username_history) : null),
        ]),

    (new Extend\ApiResource(ForumResource::class))
        ->fields(fn () => [
            \Flarum\Api\Schema\Boolean::make('canRequestUsername')
                ->get(fn ($model, \Flarum\Api\Context $context) => $context->getActor()->hasPermission('user.requestUsername')),
            \Flarum\Api\Schema\Boolean::make('canRequestNickname')
                ->get(fn ($model, \Flarum\Api\Context $context) => $context->getActor()->hasPermission('user.requestNickname')),
            \Flarum\Api\Schema\Boolean::make('canViewUsernameRequests')
                ->get(fn ($model, \Flarum\Api\Context $context) => $context->getActor()->hasPermission('user.viewUsernameRequests')),
            \Flarum\Api\Schema\Boolean::make('passwordlessSignUp')
                ->get(fn ($model, \Flarum\Api\Context $context) => !$context->getActor()->isGuest() && $context->getActor()->loginProviders()->count() > 0),
        ]),

    (new Extend\Notification())
        ->type(Notification\RequestApprovedBlueprint::class, ['email'])
        ->type(Notification\RequestRejectedBlueprint::class, ['email']),

    (new Extend\View())
        ->namespace('fof-username-request', __DIR__.'/resources/views'),
];
