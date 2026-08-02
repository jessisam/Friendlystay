<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'app' => 'FriendlyStay API Backend (Laravel)',
        'status' => 'online',
        'time' => now()->toIso8601String()
    ]);
});

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
