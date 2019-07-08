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

import UserPage from 'flarum/components/UserPage';
import humanTime from 'flarum/helpers/humanTime';

export default class ProfileConfigurePane extends UserPage {
    init() {
        super.init();
        this.loading = true;

        this.loadUser(m.route.param('username'));
    }

    content() {
        return (
            <ul>
                {this.user.data.attributes.usernameHistory.slice(0).reverse().map(username => {
                    var oldUsername = Object.keys(username)[0];
                    return (
                        <li>
                            <h2>
                                {oldUsername + ": "}
                                {humanTime(this.calculateTime(username[oldUsername]))}
                            </h2>
                        </li>
                    )
                })}
            </ul>
        )
    }

    show(user) {
        this.user = user;

        m.redraw();
    }

    calculateTime(time) {
        var d = new Date(0);
        return d.setUTCSeconds(time);
    }
}