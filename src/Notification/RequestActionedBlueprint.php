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
use Flarum\User\User;
use FoF\UserRequest\UsernameRequest;
use Symfony\Contracts\Translation\TranslatorInterface;

class RequestActionedBlueprint implements BlueprintInterface, MailableInterface
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
            'status' => $this->usernameRequest->status,
        ];
    }

    /**
     * Get the serialized type of this activity.
     *
     * @return string
     */
    public static function getType()
    {
        return 'usernameRequestActioned';
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
     * Get the name of the view to construct a notification email with.
     *
     * @return string
     */
    public function getEmailView()
    {
        return ['text' => 'fof-username-request::emails.usernameRequestActioned'];
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
            '{requested_username}'    => $this->usernameRequest->requested_username,
        ]);
    }
}
