-- Add email column to usuarios table
ALTER TABLE usuarios ADD COLUMN email VARCHAR(100) UNIQUE;
