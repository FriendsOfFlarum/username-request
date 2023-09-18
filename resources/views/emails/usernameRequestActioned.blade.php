{!! $translator->trans('fof-username-request.email.body.actioned', [
    '{recipient_display_name}' => $user->display_name,
    '{actor_display_name}' => $blueprint->actor->display_name,
    '{old_username}' => $user->username,
    '{new_username}' => $blueprint->usernameRequest->requested_username,
    '{status}' => $blueprint->usernameRequest->status,
    '{reason}' => $blueprint->usernameRequest->reason ?: $translator->trans('fof-username-request.email.body.noReasonProvided'),
    '{login_url}' => $url->to('forum')->base(),
]) !!}
