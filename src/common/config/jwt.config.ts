export const jwtConfig = {
  secretKey: process.env.JWT_SECRET || 'your-default-secret-key',
  expiresIn: process.env.JWT_EXPIRATION || '1h',
};
