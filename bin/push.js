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

const sendAll = (data, notification, tokens) => {
    tokens.forEach(token => {
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
    })
}

const sendAllWithNotification = (data, notification, tokens) => {
    tokens.forEach(token => {
        const message = {
            data: data,
            notification: notification,
            token: token
        };
        admin.messaging().send(message)
            .then((response) => {
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    })
}

module.exports.send = send
module.exports.sendAll = sendAll
module.exports.sendAllWithNotification = sendAllWithNotification