const push = require("../../bin/push");
const handleSendRoute = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    if (method === 'POST' && path === '/send/') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const data = JSON.parse(parsedBody);
            console.log(data)
            var { sendMessageDto, loopbackToken } = data;
            push.send({
                dto: JSON.stringify(sendMessageDto),
                type: "send"
            }, loopbackToken);
            // push.send(data, data.token);
        });
        return true
    }
}

module.exports = handleSendRoute