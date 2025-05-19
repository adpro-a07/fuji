// Original file: public/assets/proto/auth.proto

export const UserRole = {
  UNSPECIFIED: 'UNSPECIFIED',
  ADMIN: 'ADMIN',
  TECHNICIAN: 'TECHNICIAN',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole =
  | 'UNSPECIFIED'
  | 0
  | 'ADMIN'
  | 1
  | 'TECHNICIAN'
  | 2
  | 'CUSTOMER'
  | 3

export type UserRole__Output = typeof UserRole[keyof typeof UserRole]
