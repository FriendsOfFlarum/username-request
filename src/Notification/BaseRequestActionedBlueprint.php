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

use Carbon\Carbon;
use Flarum\User\User;
use FoF\UserRequest\UsernameRequest;
use Symfony\Contracts\Translation\TranslatorInterface;

class BaseRequestActionedBlueprint
{
    /**
     * @var UsernameRequest
     */
    public $usernameRequest;

    /**
     * @var User
     */
    public $actor;

    public function __construct(UsernameRequest $usernameRequest, User $actor)
    {
        $this->usernameRequest = $usernameRequest;
        $this->actor = $actor;
    }

    public function getRequestedUsername(): string
    {
        return $this->usernameRequest->requested_username;
    }

    /**
     * Get the user that sent the notification.
     */
    public function getFromUser()
    {
        return $this->actor;
    }

    /**
     * Get the model that is the subject of this activity.
     */
    public function getSubject()
    {
        return $this->usernameRequest;
    }

    /**
     * Get the data to be stored in the notification.
     */
    public function getData()
    {
        return [
            'status'    => $this->usernameRequest->status,
            'timestamp' => Carbon::now(),
        ];
    }

    /**
     * Get the name of the model class for the subject of this activity.
     *
     * @return string
     */
    public static function getSubjectModel()
    {
        return UsernameRequest::class;
    }

    /**
     * Get the subject line for the notification email.
     *
     * @return string
     */
    public function getEmailSubject(TranslatorInterface $translator)
    {
        $status = $this->usernameRequest->status === 'Approved' ? 'approved' : 'rejected';

        return $translator->trans('fof-username-request.email.subject.'.$status, [
            '{display_name}'          => $this->actor->display_name,
            '{requested_username}'    => $this->getRequestedUsername(),
        ]);
    }
}
