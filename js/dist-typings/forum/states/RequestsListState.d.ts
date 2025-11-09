export default class RequestsListState {
    constructor(app: any);
    app: any;
    /**
     * Whether or not the flags are loading.
     *
     * @type {Boolean}
     */
    loading: boolean;
    cache: any[];
    load(): void;
}
