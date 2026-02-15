import app from 'flarum/forum/app';
import HeaderDropdown from 'flarum/forum/components/HeaderDropdown';

import RequestsList from './RequestsList';

export default class RequestsDropdown extends HeaderDropdown {
  static initAttrs(attrs) {
    attrs.label = attrs.label || app.translator.trans('fof-username-request.forum.pending_requests.tooltip');
    attrs.icon = attrs.icon || 'fas fa-user-edit';

    super.initAttrs(attrs);
  }

  getContent() {
    return RequestsList.component({ state: app.usernameRequests });
  }

  goToRoute() {
    m.route.set(app.route('username_requests'));
  }

  getUnreadCount() {
    return app.cache.username_requests ? app.cache.username_requests.length : 0;
  }

  getNewCount() {
    return app.cache.username_requests ? app.cache.username_requests.length : 0;
  }
}
