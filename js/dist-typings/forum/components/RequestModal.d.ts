export default class RequestModal extends FormModal<import("flarum/common/components/FormModal").IFormModalAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    username: any;
    userRequestAttr: string | undefined;
    lastRequest: any;
    success: boolean | undefined;
    password: any;
    translationPrefix: string | undefined;
    title(): string | any[];
    content(): JSX.Element;
    deleteRequest(e: any): void;
    deleteLoading: boolean | undefined;
    successAlert: number | undefined;
    onsubmit(e: any): void;
    alert: any;
    submitLoading: boolean | undefined;
    onerror(error: any): void;
}
import FormModal from "flarum/common/components/FormModal";
