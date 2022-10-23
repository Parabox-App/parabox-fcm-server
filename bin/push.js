const admin = require("firebase-admin");
const send = (data, token) => {
    const message = {
        data: data,
        token: token
    };
    admin.messaging().send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

module.exports.send = send