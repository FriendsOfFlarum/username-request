{!! $translator->trans('fof-username-request.email.body.rejected', [
    '{recipient_display_name}' => $user->display_name,
    '{actor_display_name}' => $blueprint->actor->display_name,
    '{old_username}' => $user->username,
    '{requested_username}' => $blueprint->getRequestedUsername(),
    '{reason}' => $blueprint->usernameRequest->reason ?: $translator->trans('fof-username-request.email.body.noReasonProvided'),
]) !!}
