import dotenv from 'dotenv';
dotenv.config();

export const {
    APP_PORT,
    DB_URL,
    DEBUG_MODE,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    JWT_SECRET,
    JWT_EXPIRY,
    COOKIE_EXPIRY,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_FROM_NAME,
    SMTP_FROM_EMAIL,
    STRIPE_SECRET_TEST
} = process.env;