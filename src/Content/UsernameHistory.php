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

namespace FoF\UserRequest\Content;

use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface;

class UsernameHistory
{
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
    }
}