<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\AdminUser;
use App\Models\Property;
use App\Models\Review;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

class ApiEndpointsTest extends TestCase
{
    use RefreshDatabase;

    public function test_health_check_returns_ok(): void
    {
        $response = $this->getJson('/health');
        $response->assertStatus(200)
                 ->assertJson(['status' => 'ok']);
    }

    public function test_get_properties_returns_success(): void
    {
        Property::create([
            'name' => 'Test Homestay',
            'description' => 'Test description',
            'address' => '123 Beach Road',
            'price_min' => 2000,
            'price_max' => 4000,
        ]);

        $response = $this->getJson('/api/properties');
        $response->assertStatus(200)
                 ->assertJson(['success' => true])
                 ->assertJsonCount(1, 'properties');
    }

    public function test_post_enquiry_stores_successfully(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '9876543210',
            'message' => 'Interested in booking for 3 nights.',
        ];

        $response = $this->postJson('/api/enquiry', $payload);
        $response->assertStatus(200)
                 ->assertJson(['success' => true, 'message' => 'Enquiry submitted successfully']);

        $this->assertDatabaseHas('enquiries', [
            'email' => 'john@example.com',
        ]);
    }

    public function test_post_review_stores_successfully(): void
    {
        $payload = [
            'name' => 'Jane Smith',
            'rating' => 5,
            'review' => 'Wonderful place to stay!',
        ];

        $response = $this->postJson('/api/reviews', $payload);
        $response->assertStatus(200)
                 ->assertJson(['success' => true, 'message' => 'Review submitted successfully']);

        $this->assertDatabaseHas('reviews', [
            'name' => 'Jane Smith',
            'approved' => false,
        ]);
    }

    public function test_admin_login_returns_token(): void
    {
        AdminUser::create([
            'username' => 'admin',
            'password_hash' => Hash::make('password123'),
        ]);

        $response = $this->postJson('/api/admin/login', [
            'username' => 'admin',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['success' => true])
                 ->assertJsonStructure(['success', 'token']);
    }
}
