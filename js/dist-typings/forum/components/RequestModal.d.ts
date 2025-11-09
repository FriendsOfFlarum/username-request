/// <reference types="flarum/@types/translator-icu-rich" />
export default class RequestModal extends Modal<import("flarum/common/components/Modal").IInternalModalAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    username: any;
    userRequestAttr: string | undefined;
    lastRequest: any;
    success: boolean | undefined;
    password: any;
    translationPrefix: string | undefined;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): JSX.Element;
    deleteRequest(e: any): void;
    deleteLoading: boolean | undefined;
    successAlert: number | undefined;
    onsubmit(e: any): void;
    alert: any;
    submitLoading: boolean | undefined;
    onerror(error: any): void;
}
import Modal from "flarum/common/components/Modal";
