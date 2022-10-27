const push = require("../../bin/push");
const handleReceiveRoute = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    if (method === 'POST' && path === '/receive/') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const data = JSON.parse(parsedBody);
            console.log(data)
            var { receiveMessageDto, notification, targetTokensSet } = data;
            push.sendAll({
                dto: JSON.stringify(receiveMessageDto),
                type: "receive"
            }, JSON.stringify(notification), targetTokensSet);
            // push.send(data, data.token);
        });
        return true
    }
}

module.exports = handleReceiveRoute