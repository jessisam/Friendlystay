<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use App\Models\Property;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed default admin user
        AdminUser::updateOrCreate(
            ['username' => 'admin'],
            ['password_hash' => Hash::make('admin123')]
        );

        // Seed initial property
        Property::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'FriendlyStay Villa 1',
                'description' => 'Luxury stay homestay with premium amenities.',
                'address' => 'ECR Road, Mahabalipuram, Chennai',
                'price_min' => 2500,
                'price_max' => 4500,
                'amenities' => ['AC', 'Free WiFi', 'Parking', 'Kitchen', 'Pool Access'],
                'whatsapp_link' => 'https://wa.me/919840920824',
                'images' => []
            ]
        );
    }
}
