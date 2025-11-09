/// <reference types="flarum/@types/translator-icu-rich" />
export default class ActionModal extends Modal<import("flarum/common/components/Modal").IInternalModalAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    request: any;
    approved: any;
    reason: any;
    translationPrefix: string | undefined;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): JSX.Element;
    onsubmit(e: any): void;
    successAlert: number | undefined;
}
import Modal from "flarum/common/components/Modal";
