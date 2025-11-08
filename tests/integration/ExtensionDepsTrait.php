<?php

namespace FoF\UserRequest\Tests\integration;

trait ExtensionDepsTrait
{
    public function extensionDeps(): void
    {
        $this->extension('flarum-nicknames');
        $this->extension('fof-username-request');
    }
}
