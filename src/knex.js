import knex from 'knex';
import logger from './logger';

const db = knex({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
        tableName: process.env.PG_MIGRATIONS_TABLE || 'migrations',
    },
    debug: process.env.DEBUG === 'true',
});

// Debug queries in KnexJS
db.on('query', (query) => {
    logger.debug(`Query id: ${query.__knexQueryUid}`);
    logger.debug(`Query: ${query.sql}`);
}).on('query-response', (response, query) => {
    logger.debug(`Received a response from: ${query.__knexQueryUid}`);
    logger.debug(`Response: \n${JSON.stringify(response, null, 2)}`);
});

export default db;
