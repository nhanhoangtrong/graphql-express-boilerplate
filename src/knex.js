import knex from 'knex';
import logger from './logger';

const db = knex({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
        tableName: process.env.PG_MIGRATIONS_TABLE || 'migrations',
    },
    debug: process.env.NODE_ENV === 'development',
});

// Debug queries in KnexJS
db.on('query', (query) => {
    logger.debug(`Execute a query id: ${query.__knexQueryUid }`);
}).on('query-response', (response, query) => {
    logger.debug(`Received a response from: ${query.__knexQueryUid}`);
    logger.debug(`SQL query: ${query.sql}`);
    logger.debug(`Response: \n${JSON.stringify(response, null, 2)}`);
}).on('query-error', (err, query) => {
    logger.debug(`Query id: ${query.__knex.__knexQueryUid} has an error: ${err.name}`);
});

logger.info('Successfully connect to PostgreSQL');

export default db;
