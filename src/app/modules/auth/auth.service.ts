// src/app/modules/auth/auth.service.ts
import { prisma } from '../../utils/prisma';
import { hashPassword, comparePassword } from '../../utils/bcrypt';
import { signToken } from '../../utils/jwt';
import { AppError } from '../../utils/AppError';
import { SignupInput, LoginInput } from './auth.validation';
import { AuthTokenResponse } from './auth.interface';

export const authService = {
  /**
   * Register a new user.
   * Vendors get a pending VendorProfile created automatically.
   */
  async signup(payload: SignupInput): Promise<AuthTokenResponse> {
    const existing = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (existing) throw new AppError('Email is already registered.', 409);

    const hashedPassword = await hashPassword(payload.password);

    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        role: payload.role ?? 'CUSTOMER',
        // Auto-create a pending VendorProfile for VENDOR sign-ups
        ...(payload.role === 'VENDOR' && {
          vendorProfile: {
            create: {
              farmName: `${payload.name}'s Farm`,
              farmLocation: 'To be updated',
              certificationStatus: 'PENDING',
            },
          },
        }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const accessToken = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken, user };
  },

  /**
   * Login with email + password.
   */
  async login(payload: LoginInput): Promise<AuthTokenResponse> {
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        status: true,
      },
    });

    if (!user) throw new AppError('Invalid email or password.', 401);
    if (user.status === 'SUSPENDED')
      throw new AppError('Your account has been suspended. Please contact support.', 403);
    if (user.status === 'INACTIVE')
      throw new AppError('Your account is inactive.', 403);

    const passwordMatch = await comparePassword(payload.password, user.password);
    if (!passwordMatch) throw new AppError('Invalid email or password.', 401);

    const accessToken = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  },

  /**
   * Get own profile (used by /me endpoint).
   */
  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        vendorProfile: {
          select: {
            id: true,
            farmName: true,
            farmLocation: true,
            certificationStatus: true,
          },
        },
      },
    });
    if (!user) throw new AppError('User not found.', 404);
    return user;
  },
};