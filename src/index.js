import './loadenv';
import { createServer } from 'http';
import app from './app';
import logger from './logger';

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

export default server;
