<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds for Reviews.
     */
    public function run(): void
    {
        $reviews = [
            [
                'id' => 1,
                'name' => 'Karthik Raja',
                'rating' => 5,
                'review' => 'Excellent stay! Rooms were extremely clean, AC was cold, and peaceful atmosphere in Kolapakkam.',
                'approved' => 1,
                'admin_reply' => 'Thank you Karthik! Glad you enjoyed your stay with us.',
            ],
            [
                'id' => 2,
                'name' => 'Priya Sharma',
                'rating' => 5,
                'review' => 'Friendlystay Elite in Mugilivakkam was perfect for our family trip. High speed WiFi and great balcony views!',
                'approved' => 1,
                'admin_reply' => 'Thanks Priya! Looking forward to hosting you again.',
            ]
        ];

        foreach ($reviews as $data) {
            Review::updateOrCreate(['id' => $data['id']], $data);
        }
    }
}
