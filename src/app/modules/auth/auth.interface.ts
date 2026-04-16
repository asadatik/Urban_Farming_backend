// src/app/modules/auth/auth.interface.ts
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role?: 'VENDOR' | 'CUSTOMER';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}