const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:46372',
            changeOrigin: true,
        })
    )

    app.use(
        '/public',
        createProxyMiddleware({
            target: 'http://localhost:46372',
            changeOrigin: true,
        })
    )

}
