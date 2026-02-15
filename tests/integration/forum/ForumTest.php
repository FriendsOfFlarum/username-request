<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest\Tests\integration\forum;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use FoF\UserRequest\Tests\integration\ExtensionDepsTrait;
use PHPUnit\Framework\Attributes\Test;

class ForumTest extends TestCase
{
    use RetrievesAuthorizedUsers;
    use ExtensionDepsTrait;

    public function setUp(): void
    {
        parent::setUp();

        $this->extensionDeps();
    }

    #[Test]
    public function extension_loads_successfully(): void
    {
        $response = $this->send($this->request('GET', '/'));

        $this->assertEquals(200, $response->getStatusCode());

        $body = (string) $response->getBody();

        $this->assertStringStartsWith('<!doctype html>', strtolower($body));
        $this->assertStringContainsString('</html>', $body);
    }
}
