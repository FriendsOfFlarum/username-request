/// <reference types="flarum/@types/translator-icu-rich" />
export default class ResultsModal extends Modal<import("flarum/common/components/Modal").IInternalModalAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    userRequestAttr: string | undefined;
    request: any;
    translationPrefix: string | undefined;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): JSX.Element;
    onremove(): void;
}
import Modal from "flarum/common/components/Modal";
