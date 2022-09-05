const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {

    app.use(
        `${process.env.REACT_APP_API_PREFIX}`,
        createProxyMiddleware({
            target: `http://localhost:${process.env.REACT_APP_API_PORT}`,
            changeOrigin: true,
        })
    )

    app.use(
        '/public',
        createProxyMiddleware({
            target: `http://localhost:${process.env.REACT_APP_API_PORT}`,
            changeOrigin: true,
        })
    )

}
