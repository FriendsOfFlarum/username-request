import Model from 'flarum/common/Model';
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

  _requestedUsername(value?: string | null) {
    // @ts-ignore Flarum attribute funcs accept 0 or 1 arg
    return Model.attribute<string | null>('_requestedUsername').call(this, value);
  }

  requestedUsername(): string | null;
  requestedUsername(value: string | null): this;
  requestedUsername(value?: string | null): string | null | this {
    if (arguments.length) {
      this._requestedUsername(value ?? null);
      return this;
    }

    const newName = this._requestedUsername();
    if (newName !== null) return newName;

    if (!this.forNickname()) return newName;

    const user = this.user() as User | undefined;

    return user?.username() ?? null;
  }
}
