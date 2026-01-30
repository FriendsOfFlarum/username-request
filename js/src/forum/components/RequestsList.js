import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Avatar from 'flarum/common/components/Avatar';
import username from 'flarum/common/helpers/username';
import Icon from 'flarum/common/components/Icon';
import humanTime from 'flarum/common/helpers/humanTime';
import ActionModal from './ActionModal';

export default class FlagList extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.loading = false;
  }

  view() {
    const requests = app.cache.username_requests || [];

    return (
      <div className="HeaderList RequestsList">
        <div className="NotificationList-header">
          <h4 className="App-titleControl App-titleControl--text">{app.translator.trans('fof-username-request.forum.pending_requests.title')}</h4>
        </div>
        <div className="NotificationList-content">
          <ul className="HeaderListGroup-content">
            {requests.length ? (
              requests.map((request) => {
                const prefix = request.forNickname() ? 'nickname' : 'username';
                return (
                  <li>
                    <a onclick={this.showModal.bind(this, request)} className="Notification Request">
                      <Avatar user={request.user()} />
                      <Icon name="fas fa-user-edit" className="Notification-icon" />
                      <span className="Notification-content">
                        {app.translator.trans(`fof-username-request.forum.pending_requests.${prefix}_item_text`, {
                          name: username(request.user()),
                        })}
                      </span>
                      {humanTime(request.createdAt())}
                      <div className="Notification-excerpt">
                        {app.translator.trans(`fof-username-request.forum.pending_requests.${prefix}_exerpt`, {
                          requestedName: request.requestedUsername(),
                        })}
                      </div>
                    </a>
                  </li>
                );
              })
            ) : !this.loading ? (
              <div className="NotificationList-empty">{app.translator.trans('fof-username-request.forum.pending_requests.empty_text')}</div>
            ) : (
              LoadingIndicator.component({ className: 'LoadingIndicator--block' })
            )}
          </ul>
        </div>
      </div>
    );
  }

  showModal(request) {
    app.modal.show(ActionModal, { request });
  }
}
