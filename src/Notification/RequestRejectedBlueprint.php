<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest\Notification;

use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Notification\MailableInterface;

class RequestRejectedBlueprint extends BaseRequestActionedBlueprint implements BlueprintInterface, MailableInterface
{
    /**
     * Get the serialized type of this activity.
     *
     * @return string
     */
    public static function getType()
    {
        return 'usernameRequestRejected';
    }

    /**
     * Get the name of the view to construct a notification email with.
     *
     * @return string
     */
    public function getEmailView()
    {
        return ['text' => 'fof-username-request::emails.usernameRequestRejected'];
    }
}
