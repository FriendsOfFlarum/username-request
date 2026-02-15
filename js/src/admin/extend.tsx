import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';

export default [
  new Extend.Admin() //
    .permission(
      () => ({
        icon: 'fa fa-user-edit',
        label: app.translator.trans('fof-username-request.admin.permissions.moderate_requests'),
        permission: 'user.viewUsernameRequests',
      }),
      'moderate'
    )
    .permission(
      () => ({
        icon: 'fa fa-user-edit',
        label: app.translator.trans('fof-username-request.admin.permissions.request_username'),
        permission: 'user.requestUsername',
      }),
      'start'
    )
    .permission(
      () => ({
        icon: 'fa fa-user-edit',
        label: app.translator.trans('fof-username-request.admin.permissions.request_nickname'),
        permission: 'user.requestNickname',
      }),
      'start'
    )
    .setting(
      () =>
        function () {
          return [
            <h3>Important</h3>,
            <p>
              In order for permissions to be honored correctly when using <code>flarum/nicknames</code>, be sure to set <code>Edit Own Nickname</code>{' '}
              to <code>admin</code> in that extension, and use the permissions provided by this extension instead.
            </p>,
          ];
        }
    ),
];
