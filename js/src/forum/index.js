/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */

import { extend } from 'flarum/extend';
import User from 'flarum/models/User';
import Model from 'flarum/Model';
import UsernameRequest from './models/UsernameRequest';
import addRequestSetting from './addRequestSetting';
import RequestsPage from './components/RequestsPage';
import addRequestDropdown from './addRequestDropdown';
import checkForApproval from './checkForApproval';

app.initializers.add('fof-username-request', () => {
    app.store.models.username_requests = UsernameRequest;
    User.prototype.username_requests = Model.hasOne('username_requests');

    app.routes.username_requests = {path: '/username_requests', component: <RequestsPage/>};

    addRequestSetting();
    addRequestDropdown();
    checkForApproval();
});
