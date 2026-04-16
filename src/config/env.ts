
import dotenv from 'dotenv';
dotenv.config();

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (value === undefined) throw new Error(`Missing required env variable: ${key}`);
  return value;
};

export const config = {
  env: getEnv('NODE_ENV', 'development'),
  port: parseInt(getEnv('PORT', '5000'), 10),
  db: {
    url: getEnv('DATABASE_URL'),
  },
  jwt: {
    secret: getEnv('JWT_SECRET', 'fallback_secret_change_in_prod'),
    expiresIn: getEnv('JWT_EXPIRES_IN', '7d'),
  },
  bcrypt: {
    saltRounds: parseInt(getEnv('BCRYPT_SALT_ROUNDS', '12'), 10),
  },
  rateLimit: {
    windowMs: parseInt(getEnv('RATE_LIMIT_WINDOW_MS', '900000'), 10),
    max: parseInt(getEnv('RATE_LIMIT_MAX_REQUESTS', '100'), 10),
    authMax: parseInt(getEnv('AUTH_RATE_LIMIT_MAX', '10'), 10),
  },
};