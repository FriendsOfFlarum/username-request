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
import Button from 'flarum/components/Button';
import SettingsPage from 'flarum/components/SettingsPage';
import RequestModal from './components/RequestModal';

export default function () {
    extend(SettingsPage.prototype, 'accountItems', items => {
        items.add(
            'username-request',
            Button.component(
                {
                    className: 'Button',
                    onclick: () => {
                        app.modal.show(new RequestModal());
                    },
                },
                [app.translator.trans('fof-username-request.forum.account_label')]
            ),
            10
        );
    });
}