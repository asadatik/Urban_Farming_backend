"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = (key, fallback) => {
    const value = process.env[key] ?? fallback;
    if (value === undefined)
        throw new Error(`Missing required env variable: ${key}`);
    return value;
};
exports.config = {
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
//# sourceMappingURL=env.js.map