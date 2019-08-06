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

use Flarum\Event\ConfigureModelDates;
use Flarum\User\User;

class AddApiDates
{
    public function handle(ConfigureModelDates $event)
    {
        if ($event->isModel(User::class)) {
            $event->dates[] = 'read_username_requests_at';
        }
    }
}
