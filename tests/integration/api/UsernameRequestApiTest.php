<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest\Tests\integration\api;

use Carbon\Carbon;
use Flarum\Extend;
use Flarum\Group\Group;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\UserRequest\Tests\integration\ExtensionDepsTrait;
use FoF\UserRequest\UsernameRequest;
use PHPUnit\Framework\Attributes\Test;

class UsernameRequestApiTest extends TestCase
{
    use RetrievesAuthorizedUsers;
    use ExtensionDepsTrait;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extend(
            (new Extend\Csrf())
                ->exemptRoute('username-requests.index')
                ->exemptRoute('username-requests.create')
                ->exemptRoute('username-requests.update')
                ->exemptRoute('username-requests.delete')
        );

        $this->extensionDeps();

        // Add member (user 2) and moderator (user 3)
        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                [
                    'id' => 3,
                    'username' => 'moderator',
                    'email' => 'moderator@machine.local',
                    'password' => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim',
                    'is_email_confirmed' => 1,
                ],
            ],
            'group_user' => [
                ['user_id' => 2, 'group_id' => Group::MEMBER_ID],
                ['user_id' => 3, 'group_id' => Group::MODERATOR_ID],
            ],
            // Add processUsernameRequests for moderators (used by Delete visibility)
            // Add viewUsernameRequests for admin (group 1) to ensure full access in tests
            'group_permission' => [
                ['group_id' => Group::MODERATOR_ID, 'permission' => 'user.processUsernameRequests'],
                ['group_id' => Group::ADMINISTRATOR_ID, 'permission' => 'user.viewUsernameRequests'],
                ['group_id' => Group::ADMINISTRATOR_ID, 'permission' => 'user.processUsernameRequests'],
                ['group_id' => Group::ADMINISTRATOR_ID, 'permission' => 'user.requestUsername'],
            ],
        ]);
    }

    #[Test]
    public function member_can_create_username_request(): void
    {
        $response = $this->send(
            $this->request('POST', '/api/username-requests', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'type' => 'username-requests',
                        'attributes' => [
                            'requestedUsername' => 'newname',
                            'forNickname' => false,
                        ],
                    ],
                    'meta' => [
                        'password' => 'too-obscure',
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode());

        $body = json_decode((string) $response->getBody(), true);
        $this->assertArrayHasKey('data', $body);
        $this->assertEquals('username-requests', $body['data']['type']);
        $this->assertEquals('newname', $body['data']['attributes']['requestedUsername']);
        $this->assertEquals('Sent', $body['data']['attributes']['status']);
        $this->assertFalse($body['data']['attributes']['forNickname']);
    }

    #[Test]
    public function member_can_create_nickname_request(): void
    {
        $response = $this->send(
            $this->request('POST', '/api/username-requests', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'type' => 'username-requests',
                        'attributes' => [
                            'requestedUsername' => 'CoolNickname',
                            'forNickname' => true,
                        ],
                    ],
                    'meta' => [
                        'password' => 'too-obscure',
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode());

        $body = json_decode((string) $response->getBody(), true);
        $this->assertEquals('CoolNickname', $body['data']['attributes']['requestedUsername']);
        $this->assertTrue($body['data']['attributes']['forNickname']);
    }

    #[Test]
    public function create_requires_password_for_users_without_oauth(): void
    {
        $response = $this->send(
            $this->request('POST', '/api/username-requests', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'type' => 'username-requests',
                        'attributes' => [
                            'requestedUsername' => 'newname',
                            'forNickname' => false,
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(401, $response->getStatusCode());
    }

    #[Test]
    public function create_rejects_invalid_username(): void
    {
        $response = $this->send(
            $this->request('POST', '/api/username-requests', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'type' => 'username-requests',
                        'attributes' => [
                            'requestedUsername' => 'a',
                            'forNickname' => false,
                        ],
                    ],
                    'meta' => [
                        'password' => 'too-obscure',
                    ],
                ],
            ])
        );

        $this->assertEquals(422, $response->getStatusCode());
    }

    #[Test]
    public function guest_cannot_create_request(): void
    {
        $response = $this->send(
            $this->request('POST', '/api/username-requests', [
                'json' => [
                    'data' => [
                        'type' => 'username-requests',
                        'attributes' => [
                            'requestedUsername' => 'newname',
                            'forNickname' => false,
                        ],
                    ],
                ],
            ])
        );

        $this->assertContains($response->getStatusCode(), [400, 401]);
    }

    /**
     * Assert response status and include full response body in failure message for debugging.
     */
    protected function assertResponseStatus(\Psr\Http\Message\ResponseInterface $response, int $expected, string $message = ''): void
    {
        $body = (string) $response->getBody();
        $debug = sprintf(
            "Expected status %d, got %d. Response body:\n%s",
            $expected,
            $response->getStatusCode(),
            $body ?: '(empty)'
        );
        $this->assertEquals($expected, $response->getStatusCode(), $message ?: $debug);
    }

    #[Test]
    public function moderator_can_list_pending_requests(): void
    {
        // Create a request first
        $this->prepareDatabase([
            'username_requests' => [
                [
                    'user_id' => 2,
                    'requested_username' => 'pendinguser',
                    'status' => 'Sent',
                    'for_nickname' => false,
                    'reason' => null,
                    'created_at' => date('Y-m-d H:i:s'),
                ],
            ],
        ]);

        $response = $this->send(
            $this->request('GET', '/api/username-requests', [
                'authenticatedAs' => 3,
            ])
        );

        $this->assertResponseStatus($response, 200);

        $body = json_decode((string) $response->getBody(), true);
        $this->assertArrayHasKey('data', $body);
        $this->assertIsArray($body['data']);
        $this->assertGreaterThanOrEqual(1, count($body['data']));
    }

    #[Test]
    public function member_cannot_list_requests(): void
    {
        $this->prepareDatabase([
            'username_requests' => [
                [
                    'user_id' => 2,
                    'requested_username' => 'myrequest',
                    'status' => 'Sent',
                    'for_nickname' => false,
                    'reason' => null,
                    'created_at' => date('Y-m-d H:i:s'),
                ],
            ],
        ]);

        $response = $this->send(
            $this->request('GET', '/api/username-requests', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(403, $response->getStatusCode());
    }

    #[Test]
    public function moderator_can_approve_request(): void
    {
        $this->app();
        $request = new UsernameRequest();
        $request->user_id = 2;
        $request->requested_username = 'approveduser';
        $request->status = 'Sent';
        $request->for_nickname = false;
        $request->reason = null;
        $request->created_at = Carbon::now();
        $request->save();

        $response = $this->send(
            $this->request('PATCH', '/api/username-requests/'.$request->id, [
                'authenticatedAs' => 3,
                'json' => [
                    'data' => [
                        'type' => 'username-requests',
                        'id' => (string) $request->id,
                        'attributes' => [
                            'status' => 'Approved',
                        ],
                    ],
                ],
            ])
        );

        $this->assertResponseStatus($response, 200);

        $user = User::find(2);
        $this->assertEquals('approveduser', $user->username);
    }

    #[Test]
    public function moderator_can_reject_request_with_reason(): void
    {
        $this->app();
        $request = new UsernameRequest();
        $request->user_id = 2;
        $request->requested_username = 'rejecteduser';
        $request->status = 'Sent';
        $request->for_nickname = false;
        $request->reason = null;
        $request->created_at = Carbon::now();
        $request->save();

        $response = $this->send(
            $this->request('PATCH', '/api/username-requests/'.$request->id, [
                'authenticatedAs' => 3,
                'json' => [
                    'data' => [
                        'type' => 'username-requests',
                        'id' => (string) $request->id,
                        'attributes' => [
                            'status' => 'Rejected',
                            'reason' => 'Username not allowed',
                        ],
                    ],
                ],
            ])
        );

        $this->assertResponseStatus($response, 200);

        $request->refresh();
        $this->assertEquals('Rejected', $request->status);
        $this->assertEquals('Username not allowed', $request->reason);

        $user = User::find(2);
        $this->assertEquals('normal', $user->username);
    }

    #[Test]
    public function member_can_delete_own_request(): void
    {
        $this->app();
        $request = new UsernameRequest();
        $request->user_id = 2;
        $request->requested_username = 'tobedeleted';
        $request->status = 'Sent';
        $request->for_nickname = false;
        $request->reason = null;
        $request->created_at = Carbon::now();
        $request->save();

        $response = $this->send(
            $this->request('DELETE', '/api/username-requests/'.$request->id, [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertResponseStatus($response, 204);
        $this->assertNull(UsernameRequest::find($request->id));
    }

    #[Test]
    public function moderator_can_delete_any_request(): void
    {
        $this->app();
        $request = new UsernameRequest();
        $request->user_id = 2;
        $request->requested_username = 'moddeleted';
        $request->status = 'Sent';
        $request->for_nickname = false;
        $request->reason = null;
        $request->created_at = Carbon::now();
        $request->save();

        $response = $this->send(
            $this->request('DELETE', '/api/username-requests/'.$request->id, [
                'authenticatedAs' => 3,
            ])
        );

        $this->assertResponseStatus($response, 204);
        $this->assertNull(UsernameRequest::find($request->id));
    }

    #[Test]
    public function create_updates_existing_request_for_same_user_and_type(): void
    {
        $this->app();
        $request = new UsernameRequest();
        $request->user_id = 2;
        $request->requested_username = 'oldname';
        $request->status = 'Sent';
        $request->for_nickname = false;
        $request->reason = null;
        $request->created_at = Carbon::now();
        $request->save();

        $response = $this->send(
            $this->request('POST', '/api/username-requests', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'type' => 'username-requests',
                        'attributes' => [
                            'requestedUsername' => 'updatedname',
                            'forNickname' => false,
                        ],
                    ],
                    'meta' => [
                        'password' => 'too-obscure',
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode());

        $this->assertEquals(1, UsernameRequest::where('user_id', 2)->where('for_nickname', false)->count());
        $request = UsernameRequest::where('user_id', 2)->where('for_nickname', false)->first();
        $this->assertEquals('updatedname', $request->requested_username);
    }

    #[Test]
    public function admin_can_perform_all_actions(): void
    {
        $response = $this->send(
            $this->request('POST', '/api/username-requests', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'username-requests',
                        'attributes' => [
                            'requestedUsername' => 'adminrequest',
                            'forNickname' => false,
                        ],
                    ],
                    'meta' => [
                        'password' => 'password',
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode());

        $body = json_decode((string) $response->getBody(), true);
        $requestId = $body['data']['id'];

        $response = $this->send(
            $this->request('GET', '/api/username-requests', [
                'authenticatedAs' => 1,
            ])
        );
        $this->assertResponseStatus($response, 200);

        $response = $this->send(
            $this->request('PATCH', '/api/username-requests/'.$requestId, [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'username-requests',
                        'id' => $requestId,
                        'attributes' => [
                            'status' => 'Approved',
                        ],
                    ],
                ],
            ])
        );
        $this->assertResponseStatus($response, 200);

        $user = User::find(1);
        $this->assertEquals('adminrequest', $user->username);
    }
}
