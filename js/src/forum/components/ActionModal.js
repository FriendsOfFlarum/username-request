import Form from 'flarum/common/components/Form';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import FormModal from 'flarum/common/components/FormModal';
import username from 'flarum/common/helpers/username';
import Stream from 'flarum/common/utils/Stream';
import withAttr from 'flarum/common/utils/withAttr';

export default class ActionModal extends FormModal {
  oninit(vnode) {
    super.oninit(vnode);

    this.request = this.attrs.request;

    this.approved = Stream('Rejected');

    this.reason = Stream('');

    this.translationPrefix = `fof-username-request.forum.${this.request.forNickname() ? 'nickname' : 'username'}_modals.action`;
  }

  title() {
    return app.translator.trans(`${this.translationPrefix}.title`);
  }

  className() {
    return 'RequestActionModal Modal--medium';
  }

  content() {
    return (
      <div className="Modal-body">
        <Form>
          <h3 className="Notification-content">
            {app.translator.trans(`${this.translationPrefix}.name`, {
              name: username(this.request.user()),
              requestedName: this.request.requestedUsername(),
            })}
          </h3>
          <p className="help">{app.translator.trans(`${this.translationPrefix}.help_text`)}</p>
          <legend>{app.translator.trans(`${this.translationPrefix}.decision_title`)}</legend>
          <div className="Form-group">
            <label className="checkbox">
              <input
                type="radio"
                name="approved"
                value="Approved"
                checked={this.approved() === 'Approved'}
                onclick={withAttr('value', this.approved)}
              />
              {app.translator.trans(`${this.translationPrefix}.approval_label`)}
            </label>
            <label className="checkbox">
              <input
                type="radio"
                name="rejected"
                value="Rejected"
                checked={this.approved() === 'Rejected'}
                onclick={withAttr('value', this.approved)}
              />
              {app.translator.trans(`${this.translationPrefix}.rejected_label`)}
            </label>
          </div>
          {this.approved() === 'Rejected' ? (
            <div className="Form-group">
              <legend>{app.translator.trans(`${this.translationPrefix}.reason_title`)}</legend>
              <div className="BasicsPage-reason-input">
                <textarea className="FormControl" value={this.reason()} disabled={this.loading} oninput={withAttr('value', this.reason)} />
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="Form-group">
            {Button.component(
              {
                className: 'Button Button--primary Button--block',
                type: 'submit',
                loading: this.loading,
                disabled: this.approved() === 'Rejected' && !this.reason() ? true : false,
              },
              app.translator.trans(`${this.translationPrefix}.submit_button`)
            )}
          </div>
        </Form>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    this.request
      .save({
        reason: this.reason(),
        status: this.approved(),
      })
      .then(() => {
        this.successAlert = app.alerts.show({ type: 'success' }, app.translator.trans(`${this.translationPrefix}.success`));
        // Remove from cache so it disappears from the dropdown
        if (app.cache.username_requests) {
          const idx = app.cache.username_requests.findIndex((r) => r.id() === this.request.id());
          if (idx !== -1) {
            app.cache.username_requests.splice(idx, 1);
          }
        }
        m.redraw();
      })
      .catch(() => {})
      .then(() => this.hide());
  }
}
