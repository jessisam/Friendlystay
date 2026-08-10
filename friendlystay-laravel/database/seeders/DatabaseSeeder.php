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

        // Seed 1: FriendlyStay Kolapakkam
        Property::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Friendlystay Kolapakkam',
                'description' => 'Comfortable homestay located in Kolapakkam with modern facilities and cozy rooms.',
                'address' => 'Kolapakkam, Chennai, Tamil Nadu',
                'price_min' => 2000,
                'price_max' => 3800,
                'amenities' => ['AC', 'Free WiFi', 'TV', 'Power Backup', 'Housekeeping', 'Parking'],
                'whatsapp_link' => 'https://wa.me/919840920824',
                'document_url' => '/documents/Brochure - Friendlystay Kolapakkam.pdf',
                'images' => [
                    'assets/kolapakkam/K_room1.JPG',
                    'assets/kolapakkam/K_room2.JPG',
                    'assets/kolapakkam/K_room3.JPG',
                    'assets/kolapakkam/K_room4.JPG',
                    'assets/kolapakkam/K_kitchen.JPG'
                ]
            ]
        );

        // Seed 2: FriendlyStay Elite
        Property::updateOrCreate(
            ['id' => 2],
            [
                'name' => 'Friendlystay Elite',
                'description' => 'Premium luxury stay in Mugilivakkam offering spacious rooms, dining hall, balcony, and outdoor kitchen.',
                'address' => 'Mugilivakkam, Chennai, Tamil Nadu',
                'price_min' => 2300,
                'price_max' => 4000,
                'amenities' => ['AC', 'Free WiFi', 'Dining Hall', 'Balcony View', 'Outdoor Kitchen', 'Parking', '24/7 Security'],
                'whatsapp_link' => 'https://wa.me/919840920824',
                'document_url' => '/documents/Brochure - Friendlystay-Elite.pdf',
                'images' => [
                    'assets/Elite/E_hall1.JPG',
                    'assets/Elite/E_hall2.JPG',
                    'assets/Elite/E_dinning.JPG',
                    'assets/Elite/E_room1.JPG',
                    'assets/Elite/E_room2.JPG',
                    'assets/Elite/E_room3.JPG',
                    'assets/Elite/E_room4.JPG',
                    'assets/Elite/E_outkitch.JPG',
                    'assets/Elite/E_balcony.JPG'
                ]
            ]
        );

        // Seed 3: FriendlyStay Prime
        Property::updateOrCreate(
            ['id' => 3],
            [
                'name' => 'Friendlystay Prime',
                'description' => 'Modern homestay with executive rooms, elevator access, and elegant interior design.',
                'address' => 'Prime Location, Chennai, Tamil Nadu',
                'price_min' => 2500,
                'price_max' => 4500,
                'amenities' => ['AC', 'Free WiFi', 'Lift / Elevator', 'Modular Kitchen', 'Housekeeping', 'Power Backup'],
                'whatsapp_link' => 'https://wa.me/919840920824',
                'document_url' => '/documents/Brochure - Friendlystay Prime.pdf',
                'images' => [
                    'assets/prime/P_ext.JPG',
                    'assets/prime/P_hall.JPG',
                    'assets/prime/P_kitchen.JPG',
                    'assets/prime/P_bedroom.JPG',
                    'assets/prime/P_bedroom1.JPG',
                    'assets/prime/P_lift.JPG'
                ]
            ]
        );
    }
}
