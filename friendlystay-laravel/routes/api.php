<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EnquiryController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health Check
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

// Root check
Route::get('/', function () {
    return response('FriendlyStay Backend Running (Laravel)');
});

// Public Routes
Route::get('/properties', [PropertyController::class, 'index']);
Route::post('/enquiry', [EnquiryController::class, 'store']);
Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);

// Admin Auth
Route::post('/admin/login', [AuthController::class, 'login']);

// Protected Admin Routes
Route::middleware(\App\Http\Middleware\JwtAuthMiddleware::class)->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/reviews', [ReviewController::class, 'adminIndex']);
    Route::put('/reviews/{id}/approve', [ReviewController::class, 'approve']);
    Route::put('/reviews/{id}/reject', [ReviewController::class, 'reject']);
    Route::put('/reviews/{id}/reply', [ReviewController::class, 'reply']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);

    Route::get('/properties', [PropertyController::class, 'adminIndex']);
    Route::post('/properties', [PropertyController::class, 'store']);
    Route::put('/properties/{id}', [PropertyController::class, 'update']);
    Route::post('/properties/{id}/document', [PropertyController::class, 'uploadDocument']);

    Route::get('/enquiries', [EnquiryController::class, 'adminIndex']);
    Route::delete('/enquiries/{id}', [EnquiryController::class, 'destroy']);
    Route::get('/enquiries/export', [EnquiryController::class, 'exportCsv']);
});
