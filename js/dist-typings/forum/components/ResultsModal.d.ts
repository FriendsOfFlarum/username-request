import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import type UsernameRequest from '../models/UsernameRequest';
import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';
export interface ResultsModalAttrs extends IInternalModalAttrs {
    nickname: boolean | undefined;
}
export default class ResultsModal<CustomAttrs extends ResultsModalAttrs = ResultsModalAttrs> extends Modal<CustomAttrs> {
    userRequestAttr: string;
    user: User;
    request: UsernameRequest;
    translationPrefix: string;
    oninit(vnode: Mithril.Vnode): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onremove(): void;
}
