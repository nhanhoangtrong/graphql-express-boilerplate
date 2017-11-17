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

logger.info('Successfully connect to PostgreSQL');

export default db;
