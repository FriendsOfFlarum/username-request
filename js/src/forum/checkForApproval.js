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
import ResultsModal from './components/ResultsModal';

export default function () {
    return new Promise(() => {
        setTimeout(() => {
            if (app.session.user &&
                (app.session.user.lastNicknameRequest() && app.session.user.lastNicknameRequest().status() !== 'Sent' ||
                app.session.user.lastUsernameRequest() && app.session.user.lastUsernameRequest().status() !== 'Sent')
            ) {
                app.modal.show(ResultsModal);
            }
        }, 1000);
    });
}
