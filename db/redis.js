const { createClient } = require('redis');
const { defaultLogger, debug } = require('../utils');
const redisDebug = debug('redis');

const redisClient = createClient(process.env.REDIS_CONNECTION_STRING);
redisClient.on('ready', () => {
    redisDebug('Client connection ready.');
});
redisClient.on('error', (err) => {
    defaultLogger.error(err.stack, {
        from: 'redis',
    });
});

module.exports = redisClient;
