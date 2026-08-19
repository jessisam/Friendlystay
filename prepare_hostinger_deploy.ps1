# Hostinger Single Shared Hosting Package Builder

$deployDir = "C:\Users\Admin\Documents\Projects\Friendlystay\hostinger_deploy"
$zipFile = "C:\Users\Admin\Documents\Projects\Friendlystay\hostinger_public_html.zip"

Write-Host "1. Cleaning old deployment folder..."
If (Test-Path $deployDir) { Remove-Item -Recurse -Force $deployDir }
If (Test-Path $zipFile) { Remove-Item -Force $zipFile }

New-Item -ItemType Directory -Path "$deployDir" -Force
New-Item -ItemType Directory -Path "$deployDir\api" -Force

Write-Host "2. Copying React production build..."
Copy-Item -Recurse -Force "C:\Users\Admin\Documents\Projects\Friendlystay\friendlystay-react\dist\*" "$deployDir\"

Write-Host "3. Creating main .htaccess for Hostinger public_html..."
$mainHtaccess = @"
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Route /api requests to Laravel public folder
    RewriteCond %{REQUEST_URI} ^/api [NC]
    RewriteRule ^api/(.*)$ api/public/`$1 [L]

    # Serve static files directly if they exist
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # Fallback to React index.html for SPA routing
    RewriteRule ^ index.html [L]
</IfModule>
"@
Set-Content -Path "$deployDir\.htaccess" -Value $mainHtaccess -Encoding UTF8

Write-Host "4. Copying Laravel Backend to api/..."
$excludeItems = @('vendor', 'node_modules', '.git', 'storage\logs\*', 'bootstrap\cache\*')
Copy-Item -Recurse -Force "C:\Users\Admin\Documents\Projects\Friendlystay\friendlystay-laravel\*" "$deployDir\api\" -Exclude $excludeItems

Write-Host "5. Creating Hostinger production .env for Laravel..."
$laravelEnv = @"
APP_NAME="FriendlyStay"
APP_ENV=production
APP_KEY=base64:7K5V/YJ0S5K43F24xR8z7P/vH5H3Y4X5Z6W7E8R9T0Y=
APP_DEBUG=false
APP_URL=https://green-quail-458567.hostingersite.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u363724345_friendlystay
DB_USERNAME=u363724345_user
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=friendlystay1@gmail.com
MAIL_PASSWORD=srysazzyzojmebhh
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="friendlystay1@gmail.com"
MAIL_FROM_NAME="FriendlyStay Homestay"
MAIL_TO_ADDRESS="friendlystay1@gmail.com"

JWT_SECRET=friendlystay_secure_jwt_token_2026_hostinger
"@
Set-Content -Path "$deployDir\api\.env" -Value $laravelEnv -Encoding UTF8

Write-Host "6. Creating zip file hostinger_public_html.zip..."
Compress-Archive -Path "$deployDir\*" -DestinationPath $zipFile -Force

Write-Host "Deployment package successfully created at: $zipFile"
