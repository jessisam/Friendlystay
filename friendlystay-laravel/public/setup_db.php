<?php
// Zero-SSH Database Migration & Seeder Web Runner for Hostinger

$key = $_GET['key'] ?? '';
if ($key !== 'friendlystay123') {
    die('Unauthorized access. Please pass ?key=friendlystay123 in the URL.');
}

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

try {
    echo "<h2>🚀 FriendlyStay Hostinger Database Setup</h2><pre>";
    \Illuminate\Support\Facades\Artisan::call('migrate:fresh', [
        '--seed' => true,
        '--force' => true,
    ]);
    echo \Illuminate\Support\Facades\Artisan::output();
    echo "</pre><h3 style='color:green;'>✅ Database successfully migrated & seeded on Hostinger MySQL!</h3>";
    echo "<p>You can now delete this setup_db.php file for security.</p>";
} catch (\Throwable $e) {
    echo "<h3 style='color:red;'>❌ Error: " . htmlspecialchars($e->getMessage()) . "</h3>";
}
