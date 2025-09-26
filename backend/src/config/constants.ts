
export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'supersecretjwtrefreshkey';
export const ACCESS_TOKEN_EXPIRY = '15m';
export const REFRESH_TOKEN_EXPIRY = '7d';
