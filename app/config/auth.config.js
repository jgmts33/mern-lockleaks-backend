export default {
  secret: 'lockless-broker',
  jwtExpiration: 3600, // 1 hour
  adminJwtExpiration: 3600 * 24 * 365 * 1000 , // 1 hour
  jwtRefreshExpiration: 86400 // 24 hours
}