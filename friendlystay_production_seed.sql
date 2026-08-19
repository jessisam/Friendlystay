-- FriendlyStay MySQL Database Dump for Hostinger phpMyAdmin
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `properties`;
CREATE TABLE `properties` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `price_min` decimal(10,2) NOT NULL,
  `price_max` decimal(10,2) NOT NULL,
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amenities`)),
  `whatsapp_link` varchar(255) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `document_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `properties` (`id`, `name`, `description`, `address`, `price_min`, `price_max`, `amenities`, `whatsapp_link`, `images`, `document_url`, `created_at`, `updated_at`) VALUES
(1, 'Friendlystay Kolapakkam', 'Comfortable homestay located in Kolapakkam with modern facilities and cozy rooms.', 'Kolapakkam, Chennai, Tamil Nadu', 2000, 3800, '["AC","Free WiFi","TV","Power Backup","Housekeeping","Parking"]', 'https://wa.me/919840920824', '["assets\/kolapakkam\/K_room1.JPG","assets\/kolapakkam\/K_room2.JPG","assets\/kolapakkam\/K_room3.JPG","assets\/kolapakkam\/K_room4.JPG","assets\/kolapakkam\/K_kitchen.JPG"]', '/documents/Brochure - Friendlystay Kolapakkam.pdf', '2026-08-10 13:15:47', '2026-08-10 13:15:47'),
(2, 'Friendlystay Elite', 'Premium luxury stay in Mugilivakkam offering spacious rooms, dining hall, balcony, and outdoor kitchen.', 'Mugilivakkam, Chennai, Tamil Nadu', 2300, 4000, '["AC","Free WiFi","Dining Hall","Balcony View","Outdoor Kitchen","Parking","24\/7 Security"]', 'https://wa.me/919840920824', '["assets\/Elite\/E_hall1.JPG","assets\/Elite\/E_hall2.JPG","assets\/Elite\/E_dinning.JPG","assets\/Elite\/E_room1.JPG","assets\/Elite\/E_room2.JPG","assets\/Elite\/E_room3.JPG","assets\/Elite\/E_room4.JPG","assets\/Elite\/E_outkitch.JPG","assets\/Elite\/E_balcony.JPG"]', '/documents/Brochure - Friendlystay-Elite.pdf', '2026-08-10 13:15:47', '2026-08-10 13:15:47'),
(3, 'Friendlystay Prime', 'Modern homestay with executive rooms, elevator access, and elegant interior design.', 'Prime Location, Chennai, Tamil Nadu', 2500, 4500, '["AC","Free WiFi","Lift \/ Elevator","Modular Kitchen","Housekeeping","Power Backup"]', 'https://wa.me/919840920824', '["assets\/prime\/P_ext.JPG","assets\/prime\/P_hall.JPG","assets\/prime\/P_kitchen.JPG","assets\/prime\/P_bedroom.JPG","assets\/prime\/P_bedroom1.JPG","assets\/prime\/P_lift.JPG"]', '/documents/Brochure - Friendlystay Prime.pdf', '2026-08-10 13:15:47', '2026-08-10 13:15:47');

DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$12$Nq9b9gZ9pW9h59gZ9pW9hO9gZ9pW9h59gZ9pW9h59gZ9pW9h59gZ9', NOW(), NOW());

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` text NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `admin_reply` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `reviews` (`id`, `name`, `rating`, `review`, `approved`, `admin_reply`, `created_at`, `updated_at`) VALUES
(1, 'Karthik Raja', 5, 'Excellent stay! Rooms were extremely clean, AC was cold, and peaceful atmosphere in Kolapakkam.', 1, 'Thank you Karthik! Glad you enjoyed your stay with us.', NOW(), NOW()),
(2, 'Priya Sharma', 5, 'Friendlystay Elite in Mugilivakkam was perfect for our family trip. High speed WiFi and great balcony views!', 1, 'Thanks Priya! Looking forward to hosting you again.', NOW(), NOW());

SET FOREIGN_KEY_CHECKS=1;