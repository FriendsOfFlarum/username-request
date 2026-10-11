import app from 'flarum/forum/app';

export default class RequestsListState {
  constructor(app) {
    this.app = app;

    /**
     * Whether the pending requests are being loaded.
     *
     * @type {Boolean}
     */
    this.loading = false;
  }

  /**
   * Load the pending requests into app.cache.username_requests, once: a load in
   * flight or already finished is not started again.
   */
  load() {
    if (this.loading || app.cache.username_requests) {
      return;
    }

    this.loading = true;
    m.redraw();

    app.store
      .find('username-requests', { include: 'user' })
      .then((requests) => {
        app.cache.username_requests = requests.sort((a, b) => a.createdAt() - b.createdAt());
      })
      .catch(() => {
        // Leave the cache unset so a later load() (e.g. the requests page) retries.
      })
      .then(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
