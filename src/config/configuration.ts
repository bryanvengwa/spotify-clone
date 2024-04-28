export default () => ({
  port: parseInt(process.env.PORT),
  secret: process.env.SECRET_KEY,

//   DATABASE CONFIGURATIONS
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});
