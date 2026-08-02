<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment('FriendlyStay Laravel Backend Ready!');
})->purpose('Display an inspiring quote');
