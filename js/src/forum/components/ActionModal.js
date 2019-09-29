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

import Alert from 'flarum/components/Alert';
import Button from 'flarum/components/Button';
import Modal from 'flarum/components/Modal';
import username from 'flarum/helpers/username';

export default class ActionModal extends Modal {
    init() {
        super.init();

        this.request = this.props.request;

        this.approved = m.prop('Rejected');

        this.reason = m.prop('');
    }

    title() {
        return app.translator.trans('fof-username-request.forum.action.title');
    }

    className() {
        return 'RequestActionModal Modal--medium';
    }

    content() {
        return (
            <div className="Modal-body">
                <div className="Form">
                    <h3 className="Notification-content">
                        {app.translator.trans('fof-username-request.forum.action.name', {
                            username: username(this.request.user()),
                            newUsername: this.request.requestedUsername(),
                        })}
                    </h3>
                    <p className="help">{app.translator.trans('fof-username-request.forum.action.help_text')}</p>
                    <legend>{app.translator.trans('fof-username-request.forum.action.decision_title')}</legend>
                    <div className="Form-group">
                        <label className="checkbox">
                            <input
                                type="radio"
                                name="approved"
                                value="Approved"
                                checked={this.approved() === 'Approved'}
                                onclick={m.withAttr('value', this.approved)}
                            />
                            {app.translator.trans('fof-username-request.forum.action.approval_label')}
                        </label>
                        <label className="checkbox">
                            <input
                                type="radio"
                                name="rejected"
                                value="Rejected"
                                checked={this.approved() === 'Rejected'}
                                onclick={m.withAttr('value', this.approved)}
                            />
                            {app.translator.trans('fof-username-request.forum.action.rejected_label')}
                        </label>
                    </div>
                    {this.approved() === 'Rejected' ? (
                        <div className="Form-group">
                            <legend>{app.translator.trans('fof-username-request.forum.action.reason_title')}</legend>
                            <div className="BasicsPage-reason-input">
                                <textarea
                                    className="FormControl"
                                    value={this.reason()}
                                    disabled={this.loading}
                                    oninput={m.withAttr('value', this.reason)}
                                />
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    <div className="Form-group">
                        {Button.component({
                            className: 'Button Button--primary Button--block',
                            type: 'submit',
                            loading: this.loading,
                            disabled: this.approved() === 'Rejected' && !this.reason() ? true : false,
                            children: app.translator.trans('fof-username-request.forum.action.submit_button'),
                        })}
                    </div>
                </div>
            </div>
        );
    }

    onsubmit(e) {
        e.preventDefault();

        this.loading = true;

        this.request
            .save({
                reason: this.reason(),
                action: this.approved(),
            })
            .then(() => {
                app.alerts.show(
                    (this.successAlert = new Alert({
                        type: 'success',
                        children: app.translator.trans('fof-username-request.forum.action.success'),
                    }))
                );
            });

        app.cache.username_requests.some((request, i) => {
            if (request.id() == this.request.id()) {
                app.cache.username_requests.splice(i, 1);
            }
        });

        m.redraw();

        this.hide();
    }
}
