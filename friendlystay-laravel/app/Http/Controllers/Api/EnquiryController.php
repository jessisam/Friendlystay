<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\EnquiryReceivedMail;
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

            // Send email notification - fail safe
            try {
                Mail::to('appy49824@gmail.com')->send(new EnquiryReceivedMail($enquiry));
            } catch (\Exception $mailErr) {
                logger()->error('Mail sending failed: ' . $mailErr->getMessage());
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
            $enquiries = Enquiry::orderBy('created_at', 'desc')->limit(20)->get();
            return response()->json([
                'success' => true,
                'enquiries' => $enquiries
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
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
