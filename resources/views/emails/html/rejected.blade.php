<x-mail::html.notification>
    <x-slot:body>
        {!! $formatter->convert($translator->trans('fof-username-request.email.body.rejected', [
            '{actor_display_name}' => $blueprint->actor->display_name,
            '{old_username}' => $user->username,
            '{requested_username}' => $blueprint->getRequestedUsername(),
            '{reason}' => $blueprint->usernameRequest->reason ?: $translator->trans('fof-username-request.email.body.noReasonProvided'),
        ])) !!}
    </x-slot:body>
</x-mail::html.notification>
