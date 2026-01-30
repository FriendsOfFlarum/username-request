import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
import UserPage from 'flarum/forum/components/UserPage';

import type mithril from 'mithril';
import type ItemList from 'flarum/common/utils/ItemList';

export default function addProfilePage() {
  extend(UserPage.prototype, 'navItems', function (items: ItemList<mithril.Children>) {
    if (!this.user?.usernameHistory()) return;

    items.add(
      'username-requests',
      <LinkButton icon="fas fa-user-edit" href={app.route('username_history', { username: this.user.slug() })}>
        {app.translator.trans('fof-username-request.forum.user.name_history_link')}
      </LinkButton>
    );
  });
}
