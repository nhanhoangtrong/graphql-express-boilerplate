import { createClient } from 'redis';
import logger from './logger';

const redisClient = createClient(process.env.REDIS_CONNECTION_STRING);
redisClient.on('ready', () => {
    logger.info('Redis - Connection Successfully');
});
redisClient.on('error', (err) => {
    logger.error('Redis - Connection Error');
    logger.error(err.stack);
});

export default redisClient;
