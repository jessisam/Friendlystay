<?php

namespace App\Mail;

use App\Models\Enquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GuestConfirmationMail extends Mailable
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
            subject: "We Received Your Enquiry – FriendlyStay Homestay",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            htmlString: "
                <div style='font-family: Arial, sans-serif; color: #2C2C2A; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;'>
                    <div style='text-align: center; border-bottom: 2px solid #EF9F27; padding-bottom: 16px; margin-bottom: 20px;'>
                        <h2 style='color: #0C447C; margin: 0;'>FriendlyStay Homestay</h2>
                        <p style='color: #EF9F27; margin: 4px 0 0; font-weight: bold;'>Chennai, Tamil Nadu</p>
                    </div>
                    <p>Dear <strong>{$this->enquiry->name}</strong>,</p>
                    <p>Thank you for reaching out to FriendlyStay Homestay! We have received your enquiry and our team will get in touch with you shortly.</p>
                    
                    <div style='background: #F8F6F0; padding: 16px; border-radius: 8px; margin: 20px 0;'>
                        <h4 style='margin-top: 0; color: #0C447C;'>Enquiry Details:</h4>
                        <p style='margin: 6px 0;'><strong>Phone:</strong> {$this->enquiry->phone}</p>
                        <p style='margin: 6px 0;'><strong>Email:</strong> {$this->enquiry->email}</p>
                        <p style='margin: 6px 0;'><strong>Message:</strong> {$this->enquiry->message}</p>
                    </div>

                    <p>If you have urgent booking requirements, feel free to contact us directly on WhatsApp:</p>
                    <p style='text-align: center; margin: 24px 0;'>
                        <a href='https://wa.me/919840920824' style='background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;'>📱 Chat on WhatsApp</a>
                    </p>

                    <hr style='border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;'>
                    <p style='font-size: 12px; color: #718096; text-align: center;'>FriendlyStay Homestay • Kolapakkam, Mugilivakkam & Valasaravakkam, Chennai</p>
                </div>
            "
        );
    }
}
