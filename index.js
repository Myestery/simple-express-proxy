const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const targetUrl = process.env.TARGET_URL;

if (!targetUrl) {
    console.error('TARGET_URL is not defined in the .env file');
    process.exit(1);
}

// Create a proxy middleware
const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true
});

// Forward all requests to the target URL
app.use('/', proxy);

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
