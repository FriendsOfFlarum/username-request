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

import Component from 'flarum/Component';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import icon from 'flarum/helpers/icon';
import humanTime from 'flarum/helpers/humanTime';
import ActionModal from './ActionModal';

export default class FlagList extends Component {
    init() {
        this.loading = false;
    }

    view() {
        const requests = app.cache.username_requests || [];

        return (
            <div className="NotificationList RequestsList">
                <div className="NotificationList-header">
                    <h4 className="App-titleControl App-titleControl--text">{app.translator.trans('fof-username-request.forum.dropdown.title')}</h4>
                </div>
                <div className="NotificationList-content">
                    <ul className="NotificationGroup-content">
                        {requests.length ? (
                            requests.map(request => {
                                return (
                                    <li>
                                        <a onclick={this.showModal.bind(this, request)} className="Notification Request">
                                            {avatar(request.user())}
                                            {icon('fas fa-user-edit', { className: 'Notification-icon' })}
                                            <span className="Notification-content">
                                                {app.translator.trans('fof-username-request.forum.dropdown.item_text', {
                                                    username: username(request.user()),
                                                })}
                                            </span>
                                            {humanTime(request.createdAt())}
                                            <div className="Notification-excerpt">
                                                {app.translator.trans('fof-username-request.forum.dropdown.exerpt', {
                                                    requestedUsername: request.requestedUsername(),
                                                })}
                                            </div>
                                        </a>
                                    </li>
                                );
                            })
                        ) : !this.loading ? (
                            <div className="NotificationList-empty">{app.translator.trans('fof-username-request.forum.dropdown.empty_text')}</div>
                        ) : (
                            LoadingIndicator.component({ className: 'LoadingIndicator--block' })
                        )}
                    </ul>
                </div>
            </div>
        );
    }

    showModal(request) {
        app.modal.show(new ActionModal({ request }));
    }

    load() {
        if (app.cache.username_requests) {
            return;
        }

        this.loading = true;
        m.redraw();

        app.store
            .find('username-requests')
            .then(requests => {
                delete requests.payload;
                app.cache.username_requests = requests.sort((a, b) => a.createdAt() - b.createdAt());
            })
            .catch(() => {})
            .then(() => {
                this.loading = false;
                m.redraw();
            });
    }
}
