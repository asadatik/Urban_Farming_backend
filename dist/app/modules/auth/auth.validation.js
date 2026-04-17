"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'Name is required' })
        .min(2, 'Name must be at least 2 characters')
        .max(100),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address')
        .toLowerCase(),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    role: zod_1.z.enum(['VENDOR', 'CUSTOMER']).optional().default('CUSTOMER'),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address')
        .toLowerCase(),
    password: zod_1.z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
});
//# sourceMappingURL=auth.validation.js.map