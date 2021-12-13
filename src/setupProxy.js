// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    ['/v1/geo'],
    createProxyMiddleware({
      target: process.env.PROXY_TARGET,
      secure: false,
      changeOrigin: true
    })
  );
};
