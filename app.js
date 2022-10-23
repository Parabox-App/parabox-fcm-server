var admin = require("firebase-admin");
var serviceAccount = require("./secret/serviceAccountKey.json");

const server = require("./bin/server")
const push = require("./bin/push");

const version = require('./package.json').version

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const serverHandler = (req, res) => {
    console.log(`Request received: ${req.url}`);
    // push.send({},"eNfE3oDzTqe-8Hrw_xL8gE:APA91bGYCM-MVFC4-QPT_XdGTQWN-1oCbK6VYck7v3sQVTUzqb_hrSYjYuKFsxxFLfkzmFbRqqEHzZyiNvNPcT7Sx1PHLP26VJFSPYf2uTxKIDNFx3h66yLKw130LwUPDdGIh9IPLS6h")
    res.setHeader('Content-Type', 'application/json');
    var body = {
        version: version,
    };
    res.end(JSON.stringify(body));
};
server.initialize(serverHandler)

