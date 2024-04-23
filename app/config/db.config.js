export default {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: '123',
  DB: 'lockleaks',
  dialect: 'postgres',
  pool: {
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
