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

import app from 'flarum/common/app';

app.initializers.add('fof-username-request', (app) => {
    app.extensionData
        .for('fof-username-request')
        .registerPermission(
            {
                icon: 'fa fa-user-edit',
                label: app.translator.trans('fof-username-request.admin.permissions.moderate_requests'),
                permission: 'user.viewUsernameRequests',
            },
            'moderate'
        )
        .registerPermission(
            {
                icon: 'fa fa-user-edit',
                label: app.translator.trans('fof-username-request.admin.permissions.request_username'),
                permission: 'user.requestUsername',
            },
            'start'
        )
        .registerPermission(
            {
                icon: 'fa fa-user-edit',
                label: app.translator.trans('fof-username-request.admin.permissions.request_nickname'),
                permission: 'user.requestNickname',
            },
            'start'
        )
        .registerSetting(function(){
            return [
                <h3>Important</h3>,
                <p>In order for permissions to be honored correctly when using <code>flarum/nicknames</code>, be sure to set <code>Edit Own Nickname</code> to <code>admin</code> in that extension, and use the permissions provided by this extension instead.</p>
            ]
        });
});
