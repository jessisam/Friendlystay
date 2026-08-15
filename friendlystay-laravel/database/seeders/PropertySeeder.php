<?php

namespace Database\Seeders;

use App\Models\Property;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds for Properties.
     */
    public function run(): void
    {
        $properties = [
            [
                'id' => 1,
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
                    'assets/kolapakkam/K_kitchen.JPG',
                ],
            ],
            [
                'id' => 2,
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
                    'assets/Elite/E_balcony.JPG',
                ],
            ],
            [
                'id' => 3,
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
                    'assets/prime/P_lift.JPG',
                ],
            ],
        ];

        foreach ($properties as $data) {
            Property::updateOrCreate(['id' => $data['id']], $data);
        }
    }
}
