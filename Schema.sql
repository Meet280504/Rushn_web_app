CREATE DATABASE IF NOT EXISTS e_commerce;
USE e_commerce;


--  Users table ----------------------------
CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    dateOfBirth DATE,
    gender ENUM('Male','Female','Other'),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin' , 'viewer' ,'editor') DEFAULT 'user',
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL,
  icon VARCHAR(255) NULL,
  user_id INT NOT NULL,          -- owner/uploader
  created_by INT NOT NULL,       -- who created
  updated_by INT DEFAULT NULL,   -- who last updated
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (updated_by) REFERENCES users(user_id) ON DELETE CASCADE
);


-- Shoes Table
CREATE TABLE shoes (
  shoes_id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  user_id INT NOT NULL, -- user who owns/added the shoe
  brand_name VARCHAR(50) NOT NULL,
  brand_logo VARCHAR(255),
  shoe_name VARCHAR(100) NOT NULL,
  shoe_description VARCHAR(255),
  original_price DECIMAL(10,2) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  discount DECIMAL(5,2) DEFAULT 0,
  image_url VARCHAR(255),
  created_by INT NOT NULL,   -- user who created the record
  updated_by INT DEFAULT NULL, -- user who last updated the record
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (updated_by) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE shoes_colors (
  color_id INT AUTO_INCREMENT PRIMARY KEY,
  shoes_id INT NOT NULL,
  color_name VARCHAR(50) NOT NULL,
  color_code VARCHAR(20), -- e.g. HEX or RGB
  image_url VARCHAR(255) NOT NULL, -- image for this color
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (shoes_id) REFERENCES shoes(shoes_id) ON DELETE CASCADE
);

USE e_commerce;

CREATE TABLE shoes_image (
	shoes_image_id INT AUTO_INCREMENT PRIMARY KEY,
    shoes_id INT NOT NULL,
    extra_image VARCHAR(255) NULL,
    created_by INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (shoes_id) REFERENCES shoes(shoes_id) ON DELETE CASCADE
);

CREATE TABLE new_arrivals (
	arrival_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    product_category VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_by INT NOT NULL,   -- user who created the record
	updated_by INT DEFAULT NULL, -- user who last updated the record
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (updated_by) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE vouchers (
    voucher_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    code VARCHAR(100) UNIQUE, -- can be NULL if no code needed
    description TEXT,
    discount_type ENUM('percentage', 'fixed', 'free_shipping', 'bogo') NOT NULL,
    discount_value DECIMAL(10,2), -- depends on discount_type
    min_purchase DECIMAL(10,2) DEFAULT NULL,
    applicable_items JSON DEFAULT NULL, -- store array of item/category IDs
    first_purchase_only BOOLEAN DEFAULT FALSE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE flash_sale (
  sale_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  sale_title VARCHAR(255) NOT NULL,
  created_by INT NOT NULL,       -- who created
  updated_by INT DEFAULT NULL,   -- who last updated
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (updated_by) REFERENCES users(user_id) ON DELETE CASCADE
);


-- Table for payment methods
CREATE TABLE payment_methods (
    method_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,               
    description VARCHAR(255),                  
    icon_url VARCHAR(255),                     
    method_type ENUM('bank_transfer', 'card', 'wallet') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,            -- enable/disable by admin
    -- display_order INT DEFAULT 0,                -- order for UI listing
    created_by INT NOT NULL,       -- who created
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,                   -- customer making payment
    order_id INT NOT NULL,                  -- related order
    method_id BIGINT NOT NULL,                 -- references payment_methods
    amount DECIMAL(12,2) NOT NULL,
    status ENUM('pending','completed','failed','cancelled') DEFAULT 'pending',
    transaction_ref VARCHAR(100),              -- reference from payment gateway/bank
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (method_id) REFERENCES payment_methods(method_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);


-- E-Wallet providers (PayPal, OVO, Gopay…)
CREATE TABLE ewallet_providers (
    provider_id INT PRIMARY KEY AUTO_INCREMENT,
    method_id BIGINT NOT NULL,                       -- link to payment_methods
    name VARCHAR(100) NOT NULL UNIQUE,
    method_type ENUM('wallet') DEFAULT 'wallet',     -- fixed type for clarity
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (method_id) REFERENCES payment_methods(method_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);

-- User wallets
CREATE TABLE user_ewallets (
    user_ewallet_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    provider_id INT NOT NULL,
    method_id BIGINT NOT NULL,                      
    method_type ENUM('wallet') DEFAULT 'wallet',
    email VARCHAR(150) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES ewallet_providers(provider_id) ON DELETE CASCADE,
    FOREIGN KEY (method_id) REFERENCES payment_methods(method_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- Table of available banks (admin-managed)
CREATE TABLE banks (
    bank_id INT PRIMARY KEY AUTO_INCREMENT,
    method_id BIGINT NOT NULL,                       -- link to payment_methods
    name VARCHAR(150) NOT NULL UNIQUE, 
    method_type ENUM('bank_transfer') DEFAULT 'bank_transfer', 
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (method_id) REFERENCES payment_methods(method_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE user_virtual_accounts (
    virtual_account_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,               
    bank_id INT NOT NULL,               
    method_id BIGINT NOT NULL,                      -- link to payment_methods
    method_type ENUM('bank_transfer') DEFAULT 'bank_transfer',
    account_number VARCHAR(50) NOT NULL,   
    account_label VARCHAR(100),           
    is_default BOOLEAN DEFAULT FALSE,    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (bank_id) REFERENCES banks(bank_id) ON DELETE CASCADE,
    FOREIGN KEY (method_id) REFERENCES payment_methods(method_id) ON DELETE CASCADE,
    CONSTRAINT uq_user_account UNIQUE (user_id, bank_id, account_number) -- prevent duplicates
);


CREATE TABLE flash_sale_items (
  sale_item_id INT AUTO_INCREMENT PRIMARY KEY,
  sale_id INT NOT NULL,           -- link to flash_sale
  shoes_id INT NOT NULL,          -- link to shoes
  discount DECIMAL(5,2) DEFAULT 0, -- % discount (overrides shoes.discount if needed)
  start_time DATETIME NOT NULL,   -- when sale starts
  end_time DATETIME NOT NULL,     -- when sale ends
  is_active BOOLEAN DEFAULT TRUE, -- auto expire if false
  created_by INT NOT NULL,        -- who created
  updated_by INT DEFAULT NULL,    -- who updated
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sale_id) REFERENCES flash_sale(sale_id) ON DELETE CASCADE,
  FOREIGN KEY (shoes_id) REFERENCES shoes(shoes_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (updated_by) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS credit_debit_card (
    card_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    method_id BIGINT NOT NULL,
    method_type ENUM('card') DEFAULT 'card',
    card_number VARCHAR(50) NOT NULL,
    cardholder_name VARCHAR(100) NOT NULL,
    expiry_date CHAR(50) NOT NULL,
    security_code VARCHAR(4) NOT NULL,
    billing_address TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (method_id) REFERENCES payment_methods(method_id) ON DELETE CASCADE,
    CONSTRAINT uq_user_card UNIQUE (user_id, card_number)
);

USE e_commerce;
CREATE TABLE shipping_address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,              
    address_label VARCHAR(100),            
    recipient_name VARCHAR(150) NOT NULL,   
    phone_number VARCHAR(20) NOT NULL,      
    full_address TEXT NOT NULL,            
    is_default BOOLEAN DEFAULT FALSE,      
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)ON DELETE CASCADE
);


CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    shoes_id INT NOT NULL,
    shoe_name VARCHAR(255) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- Pending, Paid, Shipped, Delivered, Cancelled
    total_amount DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (shoes_id) REFERENCES shoes(shoes_id) ON DELETE CASCADE
);

USE e_commerce;
ALTER TABLE orders
ADD COLUMN voucher_id BIGINT NULL AFTER shoes_id,
ADD CONSTRAINT fk_voucher
    FOREIGN KEY (voucher_id) REFERENCES vouchers(voucher_id)
    ON DELETE CASCADE;

USE e_commerce;
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    shoes_id INT NOT NULL,
    review_text TEXT NOT NULL,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (shoes_id) REFERENCES shoes(shoes_id) ON DELETE CASCADE
);


DELETE FROM shipping_address
WHERE address_id = 7;
