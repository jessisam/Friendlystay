<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $admin = AdminUser::where('username', $request->username)->first();

        if (!$admin || !Hash::check($request->password, $admin->password_hash)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Generate JWT token matching legacy Node.js backend signature
        $secret = env('JWT_SECRET', 'friendlystay_secret_key_2024');
        $payload = [
            'id' => $admin->id,
            'username' => $admin->username,
            'iat' => time(),
            'exp' => time() + (24 * 60 * 60) // 24 hours
        ];

        $token = JWT::encode($payload, $secret, 'HS256');

        return response()->json([
            'success' => true,
            'token' => $token
        ]);
    }
}
