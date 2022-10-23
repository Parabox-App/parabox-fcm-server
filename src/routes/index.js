const version = require('../../package.json').version
const handleIndexRoute = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    if (method === 'GET' && path === '/') {
        return {
            version: version,
        };
    }
}

module.exports = handleIndexRoute