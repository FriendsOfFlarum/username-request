export default class RequestsListState {
    constructor(app: any);
    app: any;
    /**
     * Whether the pending requests are being loaded.
     *
     * @type {Boolean}
     */
    loading: boolean;
    /**
     * Load the pending requests into app.cache.username_requests, once: a load in
     * flight or already finished is not started again.
     */
    load(): void;
}
