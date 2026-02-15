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
    public function __construct(public UsernameRequest $usernameRequest, public User $actor)
    {
    }

    public function getRequestedUsername(): string
    {
        return $this->usernameRequest->requested_username;
    }

    /**
     * Get the user that sent the notification.
     */
    public function getFromUser(): User
    {
        return $this->actor;
    }

    /**
     * Get the model that is the subject of this activity.
     */
    public function getSubject(): UsernameRequest
    {
        return $this->usernameRequest;
    }

    /**
     * Get the data to be stored in the notification.
     *
     * @return array<string, mixed>
     */
    public function getData(): array
    {
        return [
            'status'    => $this->usernameRequest->status,
            'timestamp' => Carbon::now(),
        ];
    }

    /**
     * Get the name of the model class for the subject of this activity.
     */
    public static function getSubjectModel(): string
    {
        return UsernameRequest::class;
    }

    /**
     * Get the subject line for the notification email.
     */
    public function getEmailSubject(TranslatorInterface $translator): string
    {
        $status = $this->usernameRequest->status === 'Approved' ? 'approved' : 'rejected';

        return $translator->trans('fof-username-request.email.subject.'.$status, [
            '{display_name}'          => $this->actor->display_name,
            '{requested_username}'    => $this->getRequestedUsername(),
        ]);
    }
}
