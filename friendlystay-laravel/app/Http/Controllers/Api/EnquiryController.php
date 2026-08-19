<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\EnquiryReceivedMail;
use App\Mail\GuestConfirmationMail;
use App\Models\Enquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\StreamedResponse;

class EnquiryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'nullable|string',
        ]);

        try {
            $enquiry = Enquiry::create($validated);

            // Send Admin Notification Email
            try {
                $adminEmail = env('MAIL_TO_ADDRESS', 'appy49824@gmail.com');
                Mail::to($adminEmail)->send(new EnquiryReceivedMail($enquiry));
            } catch (\Exception $mailErr) {
                logger()->error('Admin mail sending failed: ' . $mailErr->getMessage());
            }

            // Send Guest Confirmation Auto-Reply Email
            try {
                Mail::to($enquiry->email)->send(new GuestConfirmationMail($enquiry));
            } catch (\Exception $guestMailErr) {
                logger()->error('Guest mail sending failed: ' . $guestMailErr->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Enquiry submitted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error'
            ], 500);
        }
    }

    public function adminIndex()
    {
        try {
            $enquiries = Enquiry::orderBy('created_at', 'desc')->get();
            return response()->json([
                'success' => true,
                'enquiries' => $enquiries
            ]);
        } catch (\Exception $e) {
            logger()->error('EnquiryController adminIndex Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => config('app.debug') ? $e->getMessage() : 'An error occurred while fetching enquiries.'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $enquiry = Enquiry::findOrFail($id);
            $enquiry->delete();
            return response()->json([
                'success' => true,
                'message' => 'Enquiry deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete enquiry'
            ], 500);
        }
    }

    public function exportCsv()
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="enquiries.csv"',
        ];

        $callback = function () {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['ID', 'Name', 'Email', 'Phone', 'Message', 'Date']);

            $enquiries = Enquiry::orderBy('created_at', 'desc')->get();
            foreach ($enquiries as $r) {
                fputcsv($handle, [
                    $r->id,
                    $r->name,
                    $r->email,
                    $r->phone,
                    $r->message,
                    $r->created_at,
                ]);
            }

            fclose($handle);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
}
