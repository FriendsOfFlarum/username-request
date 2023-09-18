{!! $translator->trans('fof-username-request.email.body.approved', [
    '{recipient_display_name}' => $user->display_name,
    '{actor_display_name}' => $blueprint->actor->display_name,
    '{new_username}' => $blueprint->getRequestedUsername(),
    '{login_url}' => $url->to('forum')->base(),
]) !!}
