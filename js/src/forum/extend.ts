import Extend from 'flarum/common/extenders';
import User from 'flarum/common/models/User';
import UsernameRequest from './models/UsernameRequest';

import RequestsPage from './components/RequestsPage';
import ProfilePage from './components/ProfilePage';

export default [
  new Extend.Routes() //
    .add('username_requests', '/username-requests', RequestsPage)
    .add('username_history', '/u/:username/history', ProfilePage),

  new Extend.Store() //
    .add('username-requests', UsernameRequest),

  new Extend.Model(User) //
    .hasOne<UsernameRequest>('lastNicknameRequest')
    .hasOne<UsernameRequest>('lastUsernameRequest')
    .attribute<unknown>('usernameHistory'),
];
