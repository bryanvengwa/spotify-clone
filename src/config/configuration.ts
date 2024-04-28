export default () => ({
  port: parseInt(process.env.PORT),
  secret: process.env.SECRET_KEY,
});
