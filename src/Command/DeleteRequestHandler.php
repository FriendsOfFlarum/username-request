<?php
/**
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */

namespace FoF\UserRequest\Command;

use Flarum\User\AssertPermissionTrait;

class DeleteRequestHandler
{
    use AssertPermissionTrait;

    /**
     * @param DeleteRequest $command
     * @return mixed
     * @throws \Flarum\User\Exception\PermissionDeniedException
     */
    public function handle(DeleteRequest $command)
    {
        $actor = $command->actor;

        $this->assertCan($actor, 'user.requestUsername');

        $usernameRequest = $actor->username_requests();

        $usernameRequest->delete();

        return $usernameRequest;
    }
}