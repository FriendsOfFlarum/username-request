import app from 'flarum/forum/app';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import type UsernameRequest from '../models/UsernameRequest';

import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';

export interface ResultsModalAttrs extends IInternalModalAttrs {
  nickname: boolean | undefined;
}

export default class ResultsModal<CustomAttrs extends ResultsModalAttrs = ResultsModalAttrs> extends Modal<CustomAttrs> {
  userRequestAttr!: string;
  user!: User;
  request!: UsernameRequest;
  translationPrefix!: string;

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    this.userRequestAttr = `last${this.attrs.nickname ? 'Nickname' : 'Username'}Request`;

    const user = app.session.user;

    if (user) {
      this.user = user;
      this.request = (this.user as User as any)[this.userRequestAttr]();
    }

    this.translationPrefix = `fof-username-request.forum.${this.request.forNickname() ? 'nickname' : 'username'}_modals.results`;
  }

  className() {
    return 'ResultsModal Modal';
  }

  title() {
    return app.translator.trans(`${this.translationPrefix}.title`);
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          {this.request.status() === 'Approved'
            ? [
                <h2>{app.translator.trans(`${this.translationPrefix}.approved`)}</h2>,
                <h3>{app.translator.trans(`${this.translationPrefix}.new_name`, { name: this.user.displayName() })}</h3>,
              ]
            : [
                <h2>{app.translator.trans(`${this.translationPrefix}.rejected`)}</h2>,
                <h3>{app.translator.trans(`${this.translationPrefix}.reason`, { reason: this.request.reason(), i: <i /> })}</h3>,
                <p className="helpText">{app.translator.trans(`${this.translationPrefix}.resubmit`)}</p>,
              ]}
          <div className="Form-group">
            <Button className="Button Button--primary Button--block" onclick={this.hide.bind(this)}>
              {app.translator.trans(`${this.translationPrefix}.dismiss_button`)}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onremove() {
    (this.user as User as any)[this.userRequestAttr] = Stream();
    this.request.save({ delete: true });
  }
}
