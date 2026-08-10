<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\Review;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $totalEnquiries = Enquiry::count();
            $weekEnquiries = Enquiry::where('created_at', '>=', now()->subDays(7))->count();
            $pendingReviews = Review::where('approved', false)->count();
            $approvedReviews = Review::where('approved', true)->count();
            $totalReviews = Review::count();

            return response()->json([
                'success' => true,
                'stats' => [
                    'totalEnquiries' => $totalEnquiries,
                    'weekEnquiries' => $weekEnquiries,
                    'pendingReviews' => $pendingReviews,
                    'approvedReviews' => $approvedReviews,
                    'totalReviews' => $totalReviews,
                ]
            ]);
        } catch (\Exception $e) {
            logger()->error('DashboardController Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => config('app.debug') ? $e->getMessage() : 'An error occurred while fetching stats.'
            ], 500);
        }
    }
}
