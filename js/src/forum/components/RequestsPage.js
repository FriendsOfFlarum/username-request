import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import extractText from 'flarum/common/utils/extractText';

import RequestsList from './RequestsList';

export default class RequestsPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    app.history.push('requests', extractText(app.translator.trans('fof-username-request.forum.pending_requests.title')));

    app.usernameRequests.load();

    this.bodyClass = 'App--requests';
  }

  view() {
    return (
      <div className="RequestsPage">
        <RequestsList state={app.usernameRequests}></RequestsList>
      </div>
    );
  }
}
