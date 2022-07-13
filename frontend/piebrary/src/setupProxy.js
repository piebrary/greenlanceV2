const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:31415',
            changeOrigin: true,
        })
    )

    app.use(
        '/public',
        createProxyMiddleware({
            target: 'http://localhost:31415',
            changeOrigin: true,
        })
    )

}
