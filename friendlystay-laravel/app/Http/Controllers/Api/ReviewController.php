<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // Public: List approved reviews
    public function index()
    {
        try {
            $reviews = Review::where('approved', true)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($reviews);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server Error'
            ], 500);
        }
    }

    // Public: Submit new review
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string',
        ]);

        try {
            Review::create([
                'name' => $validated['name'],
                'rating' => $validated['rating'],
                'review' => $validated['review'],
                'approved' => false,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Review submitted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server Error'
            ], 500);
        }
    }

    // Admin: List all reviews
    public function adminIndex()
    {
        try {
            $reviews = Review::orderBy('created_at', 'desc')->get();
            return response()->json([
                'success' => true,
                'reviews' => $reviews
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Admin: Approve review
    public function approve($id)
    {
        try {
            $review = Review::findOrFail($id);
            $review->update(['approved' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Review approved'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Admin: Reject review
    public function reject($id)
    {
        try {
            $review = Review::findOrFail($id);
            $review->update(['approved' => false]);

            return response()->json([
                'success' => true,
                'message' => 'Review rejected'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Admin: Save reply
    public function reply(Request $request, $id)
    {
        $request->validate([
            'reply' => 'required|string',
        ]);

        try {
            $review = Review::findOrFail($id);
            $review->update(['admin_reply' => $request->reply]);

            return response()->json([
                'success' => true,
                'message' => 'Reply saved'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Admin: Delete review
    public function destroy($id)
    {
        try {
            $review = Review::findOrFail($id);
            $review->delete();

            return response()->json([
                'success' => true,
                'message' => 'Review deleted'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
