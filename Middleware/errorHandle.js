// Start of errorHandle.js

const {eventLogs } = require('./eventLogs');

const errorHandle = (err, req, res, next) => {
    eventLogs(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    res.status(500).send(err.message);
}

module.exports = errorHandle;

// End of errorHandle.js
