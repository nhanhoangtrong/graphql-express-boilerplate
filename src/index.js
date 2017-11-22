import './loadenv';
import { createServer } from 'http';
import { connectMongoose } from './mongoose';
import logger from './logger';
import app from './app';

connectMongoose().then(() => {
    logger.info(`Starting server on ${process.env.NODE_ENV} mode`);
    const server = createServer(app);
    server.listen(app.get('port'), app.get('host'));
    server.on('listening', () => {
        logger.info(`Server is listening on http://${app.get('host')}:${app.get('port')}/`);
    });
    server.on('error', (err) => {
        logger.error(`Starting Server Error: ${err.name}`);
        logger.error(`Message: ${err.message}`);
        logger.error(`Stack: ${err.stack}`);
        process.exit(1);
    });
    server.on('close', () => {
        logger.info(`Server is going to close`);
    });
});
