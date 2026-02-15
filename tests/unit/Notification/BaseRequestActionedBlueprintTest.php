<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest\Tests\unit\Notification;

use FoF\UserRequest\Notification\BaseRequestActionedBlueprint;
use FoF\UserRequest\Notification\RequestApprovedBlueprint;
use FoF\UserRequest\Notification\RequestRejectedBlueprint;
use FoF\UserRequest\UsernameRequest;
use Flarum\User\User;
use PHPUnit\Framework\TestCase;

class BaseRequestActionedBlueprintTest extends TestCase
{
    public function test_get_requested_username(): void
    {
        $request = new UsernameRequest();
        $request->requested_username = 'newusername';

        $actor = $this->createMock(User::class);
        $blueprint = new RequestApprovedBlueprint($request, $actor);

        $this->assertEquals('newusername', $blueprint->getRequestedUsername());
    }

    public function test_get_subject_returns_username_request(): void
    {
        $request = new UsernameRequest();
        $actor = $this->createMock(User::class);
        $blueprint = new RequestApprovedBlueprint($request, $actor);

        $this->assertSame($request, $blueprint->getSubject());
    }

    public function test_get_from_user_returns_actor(): void
    {
        $request = new UsernameRequest();
        $actor = $this->createMock(User::class);
        $blueprint = new RequestApprovedBlueprint($request, $actor);

        $this->assertSame($actor, $blueprint->getFromUser());
    }

    public function test_approved_blueprint_type(): void
    {
        $this->assertEquals('usernameRequestApproved', RequestApprovedBlueprint::getType());
    }

    public function test_rejected_blueprint_type(): void
    {
        $this->assertEquals('usernameRequestRejected', RequestRejectedBlueprint::getType());
    }

    public function test_subject_model(): void
    {
        $this->assertEquals(UsernameRequest::class, RequestApprovedBlueprint::getSubjectModel());
    }
}
