-- Connect to PostgreSQL and run these commands

-- Create database
CREATE DATABASE bragboard;

-- Connect to bragboard database
\c bragboard

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    role VARCHAR(20) DEFAULT 'employee' CHECK (role IN ('employee', 'admin')),
    is_active BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_department ON users(department);

-- Insert sample admin user (password: admin123)
INSERT INTO users (name, email, password, department, role) 
VALUES (
    'Admin User', 
    'admin@bragboard.com', 
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzpLaEg7Iq', 
    'Management', 
    'admin'
);

-- Insert sample employees
INSERT INTO users (name, email, password, department, role) VALUES
('John Doe', 'john@bragboard.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzpLaEg7Iq', 'Engineering', 'employee'),
('Jane Smith', 'jane@bragboard.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzpLaEg7Iq', 'Marketing', 'employee'),
('Bob Johnson', 'bob@bragboard.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzpLaEg7Iq', 'Sales', 'employee');
