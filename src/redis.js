import { createClient } from 'redis';
import { logger, debug } from './utils';

const redisDebug = debug('redis');

const redisClient = createClient(process.env.REDIS_CONNECTION_STRING);
redisClient.on('ready', () => {
    redisDebug('Client connection ready.');
});
redisClient.on('error', (err) => {
    logger.error(err.stack, {
        from: 'redis',
    });
});

export default redisClient;
