-- Expense Tracker Database Schema
-- MySQL Database Script

CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    type ENUM('income', 'expense') NOT NULL DEFAULT 'expense',
    category VARCHAR(50) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_date (date),
    INDEX idx_type (type),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data (optional)
-- INSERT INTO transactions (description, amount, type, category, date, note) VALUES
-- ('Salary', 5000.00, 'income', 'Salary', NOW(), 'Monthly salary'),
-- ('Groceries', 150.50, 'expense', 'Food', NOW(), 'Weekly groceries'),
-- ('Rent', 1200.00, 'expense', 'Housing', NOW(), 'Monthly rent payment');

