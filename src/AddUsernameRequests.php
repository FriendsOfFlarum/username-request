<?php

namespace FoF\UserRequest;

use Flarum\Api\Controller\ShowForumController;
use Psr\Http\Message\ServerRequestInterface;

class AddUsernameRequests
{
    public function __invoke(ShowForumController $controller, &$data, ServerRequestInterface $request)
    {
        $data['username_requests'] = null;

        if ($request->getAttribute('actor')->can('user.viewUsernameRequests')) {
            $data['username_requests'] = UsernameRequest::where('status', 'Sent')
            ->oldest()
            ->get();
        }

        return $data;
    }
}
