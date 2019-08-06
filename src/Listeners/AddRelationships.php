<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest\Listeners;

use Flarum\Api\Controller;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Event\WillSerializeData;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\User\User;
use FoF\UserRequest\Api\Serializer\RequestSerializer;
use FoF\UserRequest\UsernameRequest;
use Illuminate\Contracts\Events\Dispatcher;

class AddRelationships
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, 'getModelRelationship']);
        $events->listen(GetApiRelationship::class, [$this, 'getApiRelationship']);
        $events->listen(WillGetData::class, [$this, 'includeRequestsRelationship']);
        $events->listen(WillSerializeData::class, [$this, 'prepareApiData']);
    }

    /**
     * @param GetModelRelationship $event
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getModelRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(User::class, 'username_requests')) {
            return $event->model->hasOne(UsernameRequest::class, 'user_id');
        }
    }

    /**
     * @param GetApiRelationship $event
     *
     * @return \Tobscure\JsonApi\Relationship|null
     */
    public function getApiRelationship(GetApiRelationship $event)
    {
        if ($event->isRelationship(ForumSerializer::class, 'username_requests')) {
            return $event->serializer->hasMany($event->model, RequestSerializer::class, 'username_requests');
        }

        if ($event->isRelationship(UserSerializer::class, 'username_requests') || $event->isRelationship(ForumSerializer::class, 'username_requests')) {
            return $event->serializer->hasOne($event->model, RequestSerializer::class, 'username_requests');
        }
    }

    /**
     * @param WillGetData $event
     */
    public function includeRequestsRelationship(WillGetData $event)
    {
        if ($event->isController(Controller\ListUsersController::class)
            || $event->isController(Controller\ShowUserController::class)) {
            $event->addInclude('username_requests');
        }

        if ($event->isController(Controller\ShowForumController::class)) {
            $event->addInclude(['username_requests', 'username_requests.user']);
        }
    }

    /**
     * @param WillSerializeData $event
     */
    public function prepareApiData(WillSerializeData $event)
    {
        if ($event->isController(Controller\ShowForumController::class)) {
            $event->data['username_requests'] = null;

            if ($event->actor->can('user.viewUsernameRequests')) {
                $event->data['username_requests'] = UsernameRequest::where('status', 'Sent')
                ->oldest()
                ->get();
            }
        }
    }
}
