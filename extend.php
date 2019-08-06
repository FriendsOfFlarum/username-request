<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest;

use Flarum\Api\Event\Serializing;
use Flarum\Event\ConfigureModelDates;
use Flarum\Extend;
use FoF\UserRequest\Api\Controller;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->route('/u/{username}/history', 'username.history.view')
        ->route('/username-requests', 'username.request.view'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Routes('api'))
        ->get('/username-requests', 'username.request.index', Controller\ListRequestsController::class)
        ->post('/username-requests', 'username.request.create', Controller\CreateRequestController::class)
        ->patch('/username-requests/{id}', 'username.request.act', Controller\ActOnRequestController::class)
        ->delete('/username-requests/{id}', 'username.request.delete', Controller\DeleteRequestController::class),

    new Extend\Locales(__DIR__.'/resources/locale'),
    function (Dispatcher $events) {
        $events->listen(Serializing::class, Listeners\AddApiAttributes::class);
        $events->listen(ConfigureModelDates::class, Listeners\AddApiDates::class);

        $events->subscribe(Listeners\AddRelationships::class);
    },
];
