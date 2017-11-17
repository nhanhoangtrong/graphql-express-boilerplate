require('dotenv').config();
module.exports = {
    development: {
        client: 'postgresql',
        connection: process.env.PG_CONNECTION_STRING,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: process.env.PG_MIGRATIONS_TABLE || 'migrations'
        },
        debug: true,
    },
    production: {
        client: 'postgresql',
        connection: process.env.PG_CONNECTION_STRING,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: process.env.PG_MIGRATIONS_TABLE || 'migrations'
        },
    },
};
