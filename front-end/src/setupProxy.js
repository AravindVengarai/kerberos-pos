const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://data.mongodb-api.com/app/data-rmdzc/endpoint/data/v1/action',
      changeOrigin: true,
      pathRewrite: { '/api': '/' },
    })
  )
}