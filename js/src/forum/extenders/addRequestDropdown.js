import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import RequestsDropdown from '../components/RequestsDropdown';

export default function () {
  extend(HeaderSecondary.prototype, 'items', function (items) {
    if (!app.session.user) return;

    const canView = app.forum.attribute('canViewUsernameRequests');
    if (!canView) return;

    if (!app.usernameRequests.cache || app.usernameRequests.cache.length === 0) {
      app.usernameRequests.load();
    }

    if (app.cache.username_requests && app.cache.username_requests.length !== 0) {
      items.add('UsernameRequests', <RequestsDropdown state={app.usernameRequests} />, 20);
    }
  });
}
