# 🚀 FriendlyStay Laravel PHP Backend Migration Guide (Hostinger Ready)

This repository contains the complete **Laravel PHP API Backend** converted from the original Node.js Express server (`friendlystay-backend`).

---

## 📌 Architecture Comparison

| Feature | Legacy Express (Node.js) | New Laravel (PHP 8.1+) |
| :--- | :--- | :--- |
| **Framework** | Node.js + Express | Laravel PHP 10/11 |
| **Database** | PostgreSQL (`pg`) | PostgreSQL (`pgsql`) or MySQL (`mysql`) via Eloquent ORM |
| **Authentication** | JWT (`jsonwebtoken` + `bcrypt`) | JWT (`firebase/php-jwt`) / Sanctum |
| **File Storage** | Cloudinary SDK (`multer`) | Cloudinary SDK / Native Laravel Storage |
| **Mail Service** | Resend API / Nodemailer | Native Mailables (`EnquiryReceivedMail`) via Hostinger SMTP / Resend |
| **Deployment Target** | Railway / Render | **Hostinger Shared Hosting / VPS / hPanel** |

---

## 🛠 Database Schema & Migrations

The Laravel project includes 4 automated migrations matching the Node.js tables:
1. `admin_users` (`id`, `username`, `password_hash`, timestamps)
2. `properties` (`id`, `name`, `description`, `address`, `price_min`, `price_max`, `amenities`, `whatsapp_link`, `images`, `document_url`, timestamps)
3. `enquiries` (`id`, `name`, `email`, `phone`, `message`, timestamps)
4. `reviews` (`id`, `name`, `rating`, `review`, `approved`, `admin_reply`, timestamps)

---

## 🌐 API Route Mapping

All endpoints match the frontend React expectations 100%:

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/health` | GET | Public | Server health check |
| `/api/properties` | GET | Public | Fetch all properties |
| `/api/enquiry` | POST | Public | Submit contact enquiry & trigger admin email |
| `/api/reviews` | GET | Public | Fetch approved reviews |
| `/api/reviews` | POST | Public | Submit new guest review |
| `/api/admin/login` | POST | Public | Admin login & JWT token retrieval |
| `/api/admin/dashboard` | GET | Admin | Stats counter (enquiries & reviews breakdown) |
| `/api/admin/reviews` | GET | Admin | Fetch all reviews |
| `/api/admin/reviews/{id}/approve` | PUT | Admin | Approve a review |
| `/api/admin/reviews/{id}/reject` | PUT | Admin | Reject a review |
| `/api/admin/reviews/{id}/reply` | PUT | Admin | Add/update admin reply |
| `/api/admin/reviews/{id}` | DELETE | Admin | Delete a review |
| `/api/admin/properties` | GET | Admin | List all properties |
| `/api/admin/properties` | POST | Admin | Create property |
| `/api/admin/properties/{id}` | PUT | Admin | Update property details |
| `/api/admin/properties/{id}/document` | POST | Admin | Upload document to Cloudinary/Storage |
| `/api/admin/enquiries` | GET | Admin | Fetch 20 recent enquiries |
| `/api/admin/enquiries/export` | GET | Admin | Export enquiries as downloadable `.csv` |

---

## 🚀 How to Deploy on Hostinger (Step-by-Step)

### Option A: Deployment via Hostinger hPanel (File Manager & MySQL)

1. **Create Database in Hostinger**:
   - Go to **Hostinger hPanel** > **Databases** > **MySQL Databases**.
   - Create a database (e.g. `u123456789_friendlystay`) and user password.

2. **Upload Files**:
   - Compress the `friendlystay-laravel` folder into a ZIP file.
   - Go to **hPanel** > **Files** > **File Manager**.
   - Upload and extract the files into `public_html` (or a subfolder like `public_html/api`).

3. **Configure Environment (`.env`)**:
   - Edit `.env` in Hostinger File Manager:
     ```env
     APP_ENV=production
     APP_DEBUG=false
     APP_URL=https://your-domain.com

     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=u123456789_friendlystay
     DB_USERNAME=u123456789_user
     DB_PASSWORD=your_database_password

     MAIL_MAILER=smtp
     MAIL_HOST=smtp.hostinger.com
     MAIL_PORT=465
     MAIL_USERNAME=info@your-domain.com
     MAIL_PASSWORD=your_email_password
     MAIL_ENCRYPTION=ssl
     ```

4. **Run Migrations & Seed Admin User**:
   - If SSH access is available in Hostinger (recommended):
     ```bash
     composer install --optimize-autoloader --no-dev
     php artisan migrate --force
     php artisan db:seed --force
     php artisan key:generate
     ```
   - Alternatively, import the initial table structure and admin seed via Hostinger phpMyAdmin.

5. **Point Hostinger Web Root**:
   - Ensure the included `.htaccess` file is present in `public_html`. It automatically forwards incoming traffic safely to `public/index.php`.

---

## 💡 Frontend Integration

Update your frontend API configuration in `friendlystay-react` (or `.env`):
```env
VITE_API_URL=https://your-domain.com/api
```
All frontend calls will automatically work without modifying any frontend React component logic!
