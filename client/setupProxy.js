const proxy = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(proxy("/api/**", { // https://github.com/chimurai/http-proxy-middleware
        target: "http://localhost:4000",
        secure: false
    }));
};

// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:4000',
//       changeOrigin: true,
//     })
//   );
// };