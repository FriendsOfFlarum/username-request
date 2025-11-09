import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import RequestModal from '../components/RequestModal';

import type Mithril from 'mithril';
import type ItemList from 'flarum/common/utils/ItemList';

export default function addRequestSetting() {
  extend(SettingsPage.prototype, 'accountItems', function (items: ItemList<Mithril.Children>) {
    const canRequestUsername = app.forum.attribute<boolean>('canRequestUsername');

    if (!canRequestUsername) return;

    items.add(
      'username-request',
      <Button className="Button" onclick={() => app.modal.show(RequestModal)}>
        {app.translator.trans('fof-username-request.forum.settings.username_request_button')}
      </Button>
    );
  });

  extend(SettingsPage.prototype, 'accountItems', function (items: ItemList<Mithril.Children>) {
    if (!app.initializers.has('flarum/nicknames')) return;

    if (app.forum.attribute<string>('displayNameDriver') !== 'nickname') return;

    if (!app.forum.attribute<boolean>('canRequestNickname')) return;

    items.add(
      'nickname-request',
      <Button className="Button" onclick={() => app.modal.show(RequestModal, { nickname: true })}>
        {app.translator.trans('fof-username-request.forum.settings.nickname_request_button')}
      </Button>
    );
  });
}
