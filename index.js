require('dotenv').config();
require('./db/knex');
const { createServer } = require('http');
const app = require('./app');
const { logger, debug } = require('./utils');

const serverDebug = debug('server');
serverDebug(`Starting server on ${process.env.NODE_ENV} mode`);

const server = createServer(app);
server.listen(app.get('port'), app.get('host'));
server.on('listening', () => {
    serverDebug(`Listening on http://${app.get('host')}:${app.get('port')}/`);
});
server.on('error', (err) => {
    logger.error(err.stack, {
        from: 'server',
    });
    server.close();
    process.exit(1);
});
server.on('close', () => {
    serverDebug('Server is going to close');
});

module.exports = server;
