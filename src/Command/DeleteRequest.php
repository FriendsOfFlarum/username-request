<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest\Command;

use Flarum\User\User;

class DeleteRequest
{
    /**
     * DeleteRequest constructor.
     *
     */
    public function __construct(public int $requestId, public User $actor)
    {
    }
}
