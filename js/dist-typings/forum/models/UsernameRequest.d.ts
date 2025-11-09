import Model from 'flarum/common/Model';
import type User from 'flarum/common/models/User';
export default class UsernameRequest extends Model {
    user(): false | User;
    status(): string | null;
    reason(): string | null;
    createdAt(): Date | null | undefined;
    forNickname(): boolean;
    _requestedUsername(): string | null;
    requestedUsername(): unknown;
}
