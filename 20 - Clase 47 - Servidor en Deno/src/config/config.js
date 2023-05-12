import dotenv from 'dotenv';

dotenv.config();

export default {
    app: {
        PORT: process.env.PORT || 8080
    },
    mongo: {
        URL: process.env.MONGO_URL
    },
    jwt: {
        SECRET: process.env.JWT_SECRET,
        COOKIE: process.env.JWT_COOKIE
    },
    session: {
        SECRET2: process.env.SESSION_SECRET,
    },
    github: {
        GITHUB_USER: process.env.GITHUB_USER,
        GITHUB_PWD: process.env.GITHUB_PWD,
    },
    google: {   
        GOOGLE_USER: process.env.GOOGLE_USER,
        GOOGLE_PWD: process.env.GOOGLE_PWD
    },
    facebook: {
        FACEBOOK_USER: process.env.FACEBOOK_USER, 
        FACEBOOK_PWD: process.env.FACEBOOK_PWD
    },
    email: {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL
    },
    nodemailer: {
        GMAIL_USER: process.env.GMAIL_USER,
        GMAIL_PWD: process.env.GMAIL_PWD
    },
    superAdmin: {
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
        SUPER_ADMIN_PWD: process.env.SUPER_ADMIN_PWD
    },
}