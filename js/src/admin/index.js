/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum.
 *
 *  For the full copyright and license information, please view the LICENSE.md
 *  file that was distributed with this source code.
 *
 */

import app from 'flarum/app';
import { extend } from 'flarum/extend';
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('fof-username-request', app => {
    extend(PermissionGrid.prototype, 'moderateItems', items => {
        items.add('fof-approve-usernames', {
            icon: 'fa fa-user-edit',
            label: app.translator.trans('fof-username-request.admin.permissions.moderate'),
            permission: 'user.viewUsernameRequests',
        });
    });

    extend(PermissionGrid.prototype, 'startItems', items => {
        items.add('fof-request-username', {
            icon: 'fa fa-user-edit',
            label: app.translator.trans('fof-username-request.admin.permissions.start'),
            permission: 'user.requestUsername',
        });
    });
});
