import './loadenv';
import './knex';
import { createServer } from 'http';
import app from './app';
import logger from './logger';

logger.info(`Starting server on ${process.env.NODE_ENV} mode`);
const server = createServer(app);
server.listen(app.get('port'), app.get('host'));
server.on('listening', () => {
    logger.info(`Server - Listening on http://${app.get('host')}:${app.get('port')}/`);
});
server.on('error', (err) => {
    logger.error('Server - Error occurred.');
    logger.error(err.stack);
    server.close();
    process.exit(1);
});
server.on('close', () => {
    logger.info('Server is going to close');
});

export default server;
