var admin = require("firebase-admin");
var serviceAccount = require("./secret/serviceAccountKey.json");

const server = require("./bin/server")

const handleIndexRoute = require("./src/routes/index")
const handleReceiveRoute = require("./src/routes/receive")
const handleSendRoute = require("./src/routes/send")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const serverHandler = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    console.log(`Request received: ${method}; ${path}`);
    // push.send({},"eNfE3oDzTqe-8Hrw_xL8gE:APA91bGYCM-MVFC4-QPT_XdGTQWN-1oCbK6VYck7v3sQVTUzqb_hrSYjYuKFsxxFLfkzmFbRqqEHzZyiNvNPcT7Sx1PHLP26VJFSPYf2uTxKIDNFx3h66yLKw130LwUPDdGIh9IPLS6h")

    res.setHeader('Content-Type', 'application/json');
    const indexResponse = handleIndexRoute(req, res);
    if (indexResponse) {
        console.log("index")
        res.end(JSON.stringify(indexResponse));
        return;
    }

    const receiveResponse = handleReceiveRoute(req, res);
    if (receiveResponse) {
        console.log("receive")
        res.end();
        return;
    }

    const sendResponse = handleSendRoute(req, res);
    if (sendResponse) {
        console.log("send")
        res.end();
        return;
    }
};
server.initialize(serverHandler)

