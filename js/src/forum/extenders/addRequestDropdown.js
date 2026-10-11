import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import RequestsDropdown from '../components/RequestsDropdown';

export default function () {
  // Load the pending requests once, when the header mounts, not from items():
  // that runs on every redraw, and loading from it fired a request per redraw.
  extend(HeaderSecondary.prototype, 'oninit', function () {
    if (app.session.user && app.forum.attribute('canViewUsernameRequests')) {
      app.usernameRequests.load();
    }
  });

  extend(HeaderSecondary.prototype, 'items', function (items) {
    if (!app.session.user) return;

    const canView = app.forum.attribute('canViewUsernameRequests');
    if (!canView) return;

    if (app.cache.username_requests && app.cache.username_requests.length !== 0) {
      items.add('UsernameRequests', <RequestsDropdown state={app.usernameRequests} />, 20);
    }
  });
}
