<?php

/*
 * This file is part of fof/username-request.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserRequest;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;

/**
 * @property int         $id
 * @property int         $user_id
 * @property string|null $requested_username
 * @property string|null $status
 * @property string|null $reason
 * @property bool        $for_nickname
 * @property \DateTime   $created_at
 * @property User        $user
 */
class UsernameRequest extends AbstractModel
{
    protected $table = 'username_requests';

    use ScopeVisibilityTrait;

    protected $casts = [
        'created_at' => 'datetime',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
