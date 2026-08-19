#!/bin/bash
# =========================================================
# FriendlyStay Hostinger SSH Automated Deployment Script
# =========================================================

set -e

echo "🚀 Starting FriendlyStay Hostinger Deployment..."

# Step 1: Deploy React Production Assets to public_html root
echo "📦 1. Copying React Frontend assets..."
cp -rf friendlystay-react/dist/* ./

# Step 2: Configure Apache .htaccess for React SPA & Laravel /api routing
echo "⚙️ 2. Generating main .htaccess..."
cat << 'EOF' > .htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Route /api requests to Laravel public directory
    RewriteCond %{REQUEST_URI} ^/api [NC]
    RewriteRule ^api/(.*)$ api/public/$1 [L]

    # Serve static files directly if they exist
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # Fallback to React index.html for SPA routing
    RewriteRule ^ index.html [L]
</IfModule>
EOF

# Step 3: Copy Laravel Backend to api/ folder
echo "🐘 3. Copying Laravel Backend to api/..."
mkdir -p api
cp -rf friendlystay-laravel/* api/

# Step 4: Run Composer & Artisan commands inside api/
cd api

if command -v composer &> /dev/null; then
    echo "🎼 Running Composer Install..."
    composer install --no-interaction --optimize-autoloader --no-dev
fi

echo "🗄️ Running Database Migrations & Seeders..."
php artisan migrate:fresh --seed --force

echo "🧹 Optimizing Laravel Caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "========================================================="
echo "✅ FriendlyStay is LIVE on Hostinger!"
echo "========================================================="
