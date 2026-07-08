<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest\Tests\integration;

use Flarum\Audit\AuditLog;
use Flarum\Audit\AuditLogger;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class AuditTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        // Lifecycle events fired outside the test transaction shouldn't create stray entries.
        AuditLogger::$testMode = true;

        $this->extension('flarum-audit', 'fof-username-request', 'flarum-nicknames');

        $this->prepareDatabase([
            'audit_log' => [],
            User::class => [
                [
                    'id'       => 3,
                    'username' => 'user3',
                    'email'    => 'user3@example.com',
                ],
            ],
            'username_requests' => [
                ['id' => 1, 'user_id' => 3, 'requested_username' => 'user33', 'status' => 'Sent', 'created_at' => '2021-01-01 00:00:00'],
                ['id' => 2, 'user_id' => 3, 'requested_username' => 'user33', 'status' => 'Sent', 'for_nickname' => true, 'created_at' => '2021-01-01 00:00:00'],
            ],
        ]);
    }

    #[Test]
    public function createUsername()
    {
        $response = $this->send($this->request('POST', '/api/username-requests', [
            'authenticatedAs' => 1,
            'json'            => [
                'data' => [
                    'type'       => 'username-requests',
                    'attributes' => [
                        'requestedUsername' => 'admin2',
                        'forNickname'       => false,
                    ],
                ],
                'meta' => [
                    'password' => 'password',
                ],
            ],
        ]));

        $this->assertEquals(201, $response->getStatusCode(), $response->getBody()->getContents());

        $log = AuditLog::query()->where('action', 'user.username_requested')->first();
        $this->assertNotNull($log);
        $this->assertEquals(1, $log->actor_id);
        $this->assertEquals([
            'user_id'      => 1,
            'new_username' => 'admin2',
        ], $log->payload);
        $this->assertEquals('127.0.0.1', $log->ip_address);
    }

    #[Test]
    public function createNickname()
    {
        $response = $this->send($this->request('POST', '/api/username-requests', [
            'authenticatedAs' => 1,
            'json'            => [
                'data' => [
                    'type'       => 'username-requests',
                    'attributes' => [
                        'requestedUsername' => 'admin2',
                        'forNickname'       => true,
                    ],
                ],
                'meta' => [
                    'password' => 'password',
                ],
            ],
        ]));

        $this->assertEquals(201, $response->getStatusCode(), $response->getBody()->getContents());

        $log = AuditLog::query()->where('action', 'user.nickname_requested')->first();
        $this->assertNotNull($log);
        $this->assertEquals(1, $log->actor_id);
        $this->assertEquals([
            'user_id'      => 1,
            'new_nickname' => 'admin2',
        ], $log->payload);
        $this->assertEquals('127.0.0.1', $log->ip_address);
    }

    #[Test]
    public function approveUsername()
    {
        $response = $this->send($this->request('PATCH', '/api/username-requests/1', [
            'authenticatedAs' => 1,
            'json'            => [
                'data' => [
                    'type'       => 'username-requests',
                    'id'         => '1',
                    'attributes' => [
                        'status' => 'Approved',
                    ],
                ],
            ],
        ]));

        $this->assertEquals(200, $response->getStatusCode(), $response->getBody()->getContents());

        $log = AuditLog::query()->where('action', 'user.username_request_approved')->first();
        $this->assertNotNull($log);
        $this->assertEquals(1, $log->actor_id);
        $this->assertEquals([
            'user_id'      => 3,
            'old_username' => 'user3',
            'new_username' => 'user33',
        ], $log->payload);
        $this->assertEquals('127.0.0.1', $log->ip_address);

        $this->assertNull(AuditLog::query()->where('action', 'user.username_changed')->first());
    }

    #[Test]
    public function approveNickname()
    {
        $response = $this->send($this->request('PATCH', '/api/username-requests/2', [
            'authenticatedAs' => 1,
            'json'            => [
                'data' => [
                    'type'       => 'username-requests',
                    'id'         => '2',
                    'attributes' => [
                        'status' => 'Approved',
                    ],
                ],
            ],
        ]));

        $this->assertEquals(200, $response->getStatusCode(), $response->getBody()->getContents());

        $log = AuditLog::query()->where('action', 'user.nickname_request_approved')->first();
        $this->assertNotNull($log);
        $this->assertEquals(1, $log->actor_id);
        $this->assertEquals([
            'user_id'      => 3,
            'old_nickname' => null,
            'new_nickname' => 'user33',
        ], $log->payload);
        $this->assertEquals('127.0.0.1', $log->ip_address);

        $this->assertNull(AuditLog::query()->where('action', 'user.nickname_changed')->first());
    }

    #[Test]
    public function rejectUsername()
    {
        $response = $this->send($this->request('PATCH', '/api/username-requests/1', [
            'authenticatedAs' => 1,
            'json'            => [
                'data' => [
                    'type'       => 'username-requests',
                    'id'         => '1',
                    'attributes' => [
                        'status' => 'Rejected',
                        'reason' => 'because',
                    ],
                ],
            ],
        ]));

        $this->assertEquals(200, $response->getStatusCode(), $response->getBody()->getContents());

        $log = AuditLog::query()->where('action', 'user.username_request_rejected')->first();
        $this->assertNotNull($log);
        $this->assertEquals(1, $log->actor_id);
        $this->assertEquals([
            'user_id'      => 3,
            'new_username' => 'user33',
            'reason'       => 'because',
        ], $log->payload);
        $this->assertEquals('127.0.0.1', $log->ip_address);
    }

    #[Test]
    public function rejectNickname()
    {
        $response = $this->send($this->request('PATCH', '/api/username-requests/2', [
            'authenticatedAs' => 1,
            'json'            => [
                'data' => [
                    'type'       => 'username-requests',
                    'id'         => '2',
                    'attributes' => [
                        'status' => 'Rejected',
                        'reason' => 'because',
                    ],
                ],
            ],
        ]));

        $this->assertEquals(200, $response->getStatusCode(), $response->getBody()->getContents());

        $log = AuditLog::query()->where('action', 'user.nickname_request_rejected')->first();
        $this->assertNotNull($log);
        $this->assertEquals(1, $log->actor_id);
        $this->assertEquals([
            'user_id'      => 3,
            'new_nickname' => 'user33',
            'reason'       => 'because',
        ], $log->payload);
        $this->assertEquals('127.0.0.1', $log->ip_address);
    }
}
