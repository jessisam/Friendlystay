<?php

namespace App\Mail;

use App\Models\Enquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EnquiryReceivedMail extends Mailable
{
    use Queueable, SerializesModels;

    public Enquiry $enquiry;

    /**
     * Create a new message instance.
     */
    public function __construct(Enquiry $enquiry)
    {
        $this->enquiry = $enquiry;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New Enquiry from {$this->enquiry->name} – FriendlyStay",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            htmlString: "
                <h2>New Enquiry Received</h2>
                <p><strong>Name:</strong> {$this->enquiry->name}</p>
                <p><strong>Email:</strong> {$this->enquiry->email}</p>
                <p><strong>Phone:</strong> {$this->enquiry->phone}</p>
                <p><strong>Message:</strong> {$this->enquiry->message}</p>
            "
        );
    }
}
