import app from 'flarum/forum/app';
import ResultsModal from '../components/ResultsModal';

export default function checkForApproval() {
  return new Promise(() => {
    setTimeout(() => {
      const user = app.session.user;

      if (!user) return;

      const approvedNickname = user.lastNicknameRequest() && user.lastNicknameRequest()?.status() !== 'Sent';
      const approvedUsername = user.lastUsernameRequest() && user.lastUsernameRequest()?.status() !== 'Sent';

      if (approvedNickname || approvedUsername) {
        app.modal.show(ResultsModal, { nickname: approvedNickname });
      }
    }, 1000);
  });
}
