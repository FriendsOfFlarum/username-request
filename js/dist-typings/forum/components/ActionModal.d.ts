export default class ActionModal extends FormModal<import("flarum/common/components/FormModal").IFormModalAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    request: any;
    approved: any;
    reason: any;
    translationPrefix: string | undefined;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(e: any): void;
    successAlert: number | undefined;
}
import FormModal from "flarum/common/components/FormModal";
