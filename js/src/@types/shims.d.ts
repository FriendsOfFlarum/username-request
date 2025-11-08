import 'flarum/forum/ForumApplication';
import 'flarum/common/models/User';
import RequestsListState from '../forum/states/RequestsListState';
import type UsernameRequest from '../forum/models/UsernameRequest';

declare module 'flarum/forum/ForumApplication' {
  export default interface ForumApplication {
    usernameRequests: RequestsListState;
  }
}

declare module 'flarum/common/models/User' {
  export default interface User {
    lastNicknameRequest(): UsernameRequest | null;
    lastUsernameRequest(): UsernameRequest | null;
    usernameHistory(): unknown;
  }
}
