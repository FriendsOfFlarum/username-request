import Model from 'flarum/common/Model';
import computed from 'flarum/common/utils/computed';

import type User from 'flarum/common/models/User';

export default class UsernameRequest extends Model {
  user() {
    return Model.hasOne<User>('user').call(this);
  }

  status() {
    return Model.attribute<string | null>('status').call(this);
  }

  reason() {
    return Model.attribute<string | null>('reason').call(this);
  }

  createdAt() {
    return Model.attribute('createdAt', Model.transformDate).call(this);
  }

  forNickname() {
    return Model.attribute<boolean>('forNickname').call(this);
  }

  _requestedUsername() {
    return Model.attribute<string | null>('requestedUsername').call(this);
  }

  requestedUsername() {
    return computed('_requestedUsername', 'forNickname', 'user', function (newName, forNickname, user) {
      return newName === null && forNickname ? (user as User).username() : newName;
    }).call(this);
  }
}
