import sqlite3, json

conn = sqlite3.connect('friendlystay-laravel/database/database.sqlite')
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

sql_lines = [
    "-- FriendlyStay MySQL Database Dump for Hostinger phpMyAdmin",
    "SET FOREIGN_KEY_CHECKS=0;\n",
    "DROP TABLE IF EXISTS `properties`;",
    "CREATE TABLE `properties` (",
    "  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,",
    "  `name` varchar(255) NOT NULL,",
    "  `description` text DEFAULT NULL,",
    "  `address` varchar(255) NOT NULL,",
    "  `price_min` decimal(10,2) NOT NULL,",
    "  `price_max` decimal(10,2) NOT NULL,",
    "  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amenities`)),",
    "  `whatsapp_link` varchar(255) DEFAULT NULL,",
    "  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),",
    "  `document_url` varchar(255) DEFAULT NULL,",
    "  `created_at` timestamp NULL DEFAULT NULL,",
    "  `updated_at` timestamp NULL DEFAULT NULL,",
    "  PRIMARY KEY (`id`)",
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n",
    "INSERT INTO `properties` (`id`, `name`, `description`, `address`, `price_min`, `price_max`, `amenities`, `whatsapp_link`, `images`, `document_url`, `created_at`, `updated_at`) VALUES"
]

cursor.execute('SELECT * FROM properties')
prop_rows = cursor.fetchall()
prop_inserts = []
for row in prop_rows:
    desc = row['description'].replace("'", "''")
    addr = row['address'].replace("'", "''")
    amenities = row['amenities'].replace("'", "''")
    images = row['images'].replace("'", "''")
    prop_inserts.append(f"({row['id']}, '{row['name']}', '{desc}', '{addr}', {row['price_min']}, {row['price_max']}, '{amenities}', '{row['whatsapp_link']}', '{images}', '{row['document_url']}', '{row['created_at']}', '{row['updated_at']}')")

sql_lines.append(",\n".join(prop_inserts) + ";\n")

sql_lines.extend([
    "DROP TABLE IF EXISTS `admin_users`;",
    "CREATE TABLE `admin_users` (",
    "  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,",
    "  `username` varchar(255) NOT NULL UNIQUE,",
    "  `password_hash` varchar(255) NOT NULL,",
    "  `created_at` timestamp NULL DEFAULT NULL,",
    "  `updated_at` timestamp NULL DEFAULT NULL,",
    "  PRIMARY KEY (`id`)",
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n",
    "INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `created_at`, `updated_at`) VALUES",
    "(1, 'admin', '$2y$12$Nq9b9gZ9pW9h59gZ9pW9hO9gZ9pW9h59gZ9pW9h59gZ9pW9h59gZ9', NOW(), NOW());\n",
    "DROP TABLE IF EXISTS `reviews`;",
    "CREATE TABLE `reviews` (",
    "  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,",
    "  `name` varchar(255) NOT NULL,",
    "  `rating` int(11) NOT NULL,",
    "  `review` text NOT NULL,",
    "  `approved` tinyint(1) NOT NULL DEFAULT 0,",
    "  `admin_reply` text DEFAULT NULL,",
    "  `created_at` timestamp NULL DEFAULT NULL,",
    "  `updated_at` timestamp NULL DEFAULT NULL,",
    "  PRIMARY KEY (`id`)",
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n",
    "INSERT INTO `reviews` (`id`, `name`, `rating`, `review`, `approved`, `admin_reply`, `created_at`, `updated_at`) VALUES",
    "(1, 'Karthik Raja', 5, 'Excellent stay! Rooms were extremely clean, AC was cold, and peaceful atmosphere in Kolapakkam.', 1, 'Thank you Karthik! Glad you enjoyed your stay with us.', NOW(), NOW()),",
    "(2, 'Priya Sharma', 5, 'Friendlystay Elite in Mugilivakkam was perfect for our family trip. High speed WiFi and great balcony views!', 1, 'Thanks Priya! Looking forward to hosting you again.', NOW(), NOW());\n",
    "SET FOREIGN_KEY_CHECKS=1;"
])

with open('friendlystay_production_seed.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(sql_lines))

print("Created friendlystay_production_seed.sql successfully.")
