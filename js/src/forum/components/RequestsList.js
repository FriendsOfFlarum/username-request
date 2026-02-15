import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import HeaderList from 'flarum/forum/components/HeaderList';
import HeaderListGroup from 'flarum/forum/components/HeaderListGroup';
import HeaderListItem from 'flarum/forum/components/HeaderListItem';
import Avatar from 'flarum/common/components/Avatar';
import username from 'flarum/common/helpers/username';
import ActionModal from './ActionModal';

export default class RequestsList extends Component {
  view() {
    const requests = app.cache.username_requests || [];
    const loading = this.attrs.state?.loading ?? false;

    return (
      <HeaderList
        className="RequestsList"
        title={app.translator.trans('fof-username-request.forum.pending_requests.title')}
        hasItems={requests.length > 0}
        loading={loading}
        emptyText={app.translator.trans('fof-username-request.forum.pending_requests.empty_text')}
      >
        {requests.length > 0 && (
          <HeaderListGroup label={app.translator.trans('fof-username-request.forum.pending_requests.group_label')}>
            {requests.map((request) => {
              const prefix = request.forNickname() ? 'nickname' : 'username';
              return (
                <HeaderListItem
                  key={request.id()}
                  avatar={<Avatar user={request.user()} />}
                  icon="fas fa-user-edit"
                  content={app.translator.trans(`fof-username-request.forum.pending_requests.${prefix}_item_text`, {
                    name: username(request.user()),
                  })}
                  excerpt={app.translator.trans(`fof-username-request.forum.pending_requests.${prefix}_exerpt`, {
                    requestedName: request.requestedUsername(),
                  })}
                  datetime={request.createdAt()}
                  onclick={() => this.showModal(request)}
                />
              );
            })}
          </HeaderListGroup>
        )}
      </HeaderList>
    );
  }

  showModal(request) {
    app.modal.show(ActionModal, { request });
  }
}
