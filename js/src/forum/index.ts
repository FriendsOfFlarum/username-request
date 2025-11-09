import app from 'flarum/forum/app';
import addRequestSetting from './extenders/addRequestSetting';
import addRequestDropdown from './extenders/addRequestDropdown';
import checkForApproval from './extenders/checkForApproval';
import addProfilePage from './extenders/addProfilePage';
import RequestsListState from './states/RequestsListState';

export { default as extend } from './extend';

app.initializers.add('fof-username-request', () => {
  app.usernameRequests = new RequestsListState(app);

  addRequestSetting();
  addRequestDropdown();
  checkForApproval();
  addProfilePage();
});
