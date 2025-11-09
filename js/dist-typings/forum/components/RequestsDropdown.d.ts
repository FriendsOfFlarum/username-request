export default class RequestsDropdown extends NotificationsDropdown<import("flarum/common/components/Dropdown").IDropdownAttrs> {
    static initAttrs(attrs: any): void;
    constructor();
    getUnreadCount(): any;
    getNewCount(): any;
}
import NotificationsDropdown from "flarum/forum/components/NotificationsDropdown";
