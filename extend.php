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
        ->css(__DIR__.'/resources/less/UsernameRequest.less')
        ->route('/username_history/{username}', 'username.history.view'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Routes('api'))
        ->get('/username_requests', 'username.request.index', Controller\ListRequestsController::class)
        ->post('/username_requests', 'username.request.create', Controller\CreateRequestController::class)
        ->patch('/username_requests/{id}', 'username.request.act', Controller\ActOnRequestController::class)
        ->delete('/username_requests/{id}', 'username.request.delete', Controller\DeleteRequestController::class),

    new Extend\Locales(__DIR__.'/resources/locale'),
    function (Dispatcher $events) {
        $events->listen(Serializing::class,Listeners\AddApiAttributes::class);
        $events->listen(ConfigureModelDates::class,Listeners\AddApiDates::class);

        $events->subscribe(Listeners\AddRelationships::class);
    },
];
