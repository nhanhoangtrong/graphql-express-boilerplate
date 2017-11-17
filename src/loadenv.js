import dotenv from 'dotenv';
dotenv.config();

// Assign the NODE_ENV default to development
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV = 'development';
}
