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

import NotificationsDropdown from 'flarum/components/NotificationsDropdown';

import RequestsList from './RequestsList';

export default class RequestsDropdown extends NotificationsDropdown {
    static initProps(props) {
        props.label = props.label || app.translator.trans('fof-username-request.forum.dropdown.tooltip');
        props.icon = props.icon || 'fas fa-user-edit';

        super.initProps(props);
    }

    init() {
        super.init();

        this.list = new RequestsList();
    }

    goToRoute() {
        m.route(app.route('username_requests'));
    }

    getUnreadCount() {
        if (app.cache.username_requests) {
            return app.cache.username_requests.length;
        }
        return app.forum.data.relationships.username_requests.data.length;
    }

    getNewCount() {
        if (app.cache.username_requests) {
            return app.cache.username_requests.length;
        }
        return app.forum.data.relationships.username_requests.data.length;
    }
}
