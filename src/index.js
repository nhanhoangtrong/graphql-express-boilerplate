import './loadenv';
import { createServer } from 'http';
import app from './app';
import { logger, debug } from './utils';
import { connectMongoose } from './mongoose';

const serverDebug = debug('server');

connectMongoose().then(() => {
    serverDebug(`Starting server on ${process.env.NODE_ENV} mode`);
    const server = createServer(app);
    server.listen(app.get('port'), app.get('host'));
    server.on('listening', () => {
        serverDebug(
            `Listening on http://${app.get('host')}:${app.get('port')}/`
        );
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
});
