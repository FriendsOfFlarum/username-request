export default class ProfileConfigurePane extends UserPage<import("flarum/forum/components/UserPage").IUserPageAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    loading: boolean | undefined;
    content(): JSX.Element;
    show(user: any): void;
    calculateTime(time: any): number;
}
import UserPage from "flarum/forum/components/UserPage";
