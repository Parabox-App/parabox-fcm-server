const http = require('http');
const https = require(`https`);
const fs = require(`fs`);
const config = require(`../config`);

const initialize = (serverHandler) => {
    const port = config.port
    if (config.enable_https) {
        const options = {
            key: fs.readFileSync(config.key_path),
            cert: fs.readFileSync(config.cert_path)
        };
        const server = https.createServer(options, serverHandler);
    } else {
        const server = http.createServer(serverHandler);
        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}

module.exports.initialize = initialize;
