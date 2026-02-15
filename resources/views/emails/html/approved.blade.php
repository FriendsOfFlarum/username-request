<x-mail::html.notification>
    <x-slot:body>
        {!! $formatter->convert($translator->trans('fof-username-request.email.body.approved', [
            '{actor_display_name}' => $blueprint->actor->display_name,
            '{new_username}' => $blueprint->getRequestedUsername(),
            '{login_url}' => $url->to('forum')->base(),
        ])) !!}
    </x-slot:body>
</x-mail::html.notification>
