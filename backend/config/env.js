import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'green-secret-key',
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://127.0.0.1:5000',
  adminCode: process.env.ADMIN_SECRET, // ✅ Add this line
};
export default config;