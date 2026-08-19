# 🚀 Hostinger SSH Automated Deployment Guide

This guide details how to deploy FriendlyStay to your Hostinger server using SSH access.

---

## 🔑 Step 1: Connect via SSH
Open your terminal (macOS/Linux) or PowerShell (Windows) and connect using your Hostinger SSH details:

```bash
ssh u363724345@91.108.107.243
```
*(Or use `ssh u363724345@green-quail-458567.hostingersite.com`)*

---

## 📥 Step 2: Clone Repository & Prepare Directory
Navigate to `public_html`:

```bash
cd public_html

# If public_html has old files, clean it:
rm -rf *

# Clone repository directly into public_html:
git clone https://github.com/jessisam/Friendlystay.git .
```

---

## ⚙️ Step 3: Configure Database Credentials
Edit the `friendlystay-laravel/.env` file with your Hostinger MySQL database details:

```bash
nano friendlystay-laravel/.env
```

Set your Hostinger MySQL settings:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u363724345_friendlystay
DB_USERNAME=u363724345_user
DB_PASSWORD=YourChosenPassword
```

---

## 🚀 Step 4: Run 1-Command Automated Deployment
Make `deploy.sh` executable and run it:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## ✅ What `deploy.sh` Automates

1. **Deploys React SPA**: Copies compiled production files to `public_html/` root.
2. **Generates `.htaccess`**: Sets up URL rewrites so `/api/*` requests go to Laravel and all other paths load the React SPA.
3. **Deploys Laravel API Engine**: Installs PHP packages, runs database migrations & seeders (`PropertySeeder`, `AdminUserSeeder`, `ReviewSeeder`).
4. **Optimizes Performance**: Caches route and config files for maximum speed.

---

## 🌐 Live URLs
* **Website**: `https://green-quail-458567.hostingersite.com`
* **Admin Login**: `https://green-quail-458567.hostingersite.com/admin` (Username: `admin`, Password: `admin123`)
