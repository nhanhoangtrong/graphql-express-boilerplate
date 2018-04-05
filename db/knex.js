const knex = require('knex');
const { debug } = require('../utils');

const db = knex({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
        tableName: process.env.PG_MIGRATIONS_TABLE || 'migrations',
    },
});

const knexDebug = debug('knex');

// Debug queries in KnexJS
db
    .on('query', (query) => {
        knexDebug(`Query id: ${query.__knexQueryUid}`);
        knexDebug(`Query: ${query.sql}`);
    })
    .on('query-response', (response, query) => {
        knexDebug(`Received a response from: ${query.__knexQueryUid}`);
        knexDebug(`Response: \n${JSON.stringify(response, null, 2)}`);
    });

module.exports = db;
