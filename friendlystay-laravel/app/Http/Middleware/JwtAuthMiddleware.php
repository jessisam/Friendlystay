<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\Response;

class JwtAuthMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization');

        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->json([
                'success' => false,
                'message' => 'No token provided'
            ], 401);
        }

        $token = substr($header, 7);
        $secret = env('JWT_SECRET', 'friendlystay_secret_key_2024');

        try {
            $decoded = JWT::decode($token, new Key($secret, 'HS256'));
            $request->attributes->set('admin', $decoded);
            return $next($request);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid token'
            ], 401);
        }
    }
}
