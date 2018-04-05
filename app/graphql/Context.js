const DataLoader = require('dataloader');
const knex = require('../../db/knex');
const { mapTo } = require('./utils');
/**
 * GraphQL Context class, storing request and user information, need to be created per request
 *
 * @public
 */
module.exports = class Context {
    /**
     * Constructing a new GraphQL context value for storing user and loader
     *
     * @param {Express.Request} req
     */
    constructor(req) {
        this.req = req;
        this.user = req.user;
        this.loadUserById = new DataLoader((keys) =>
            knex
                .table('users')
                .whereIn('id', keys)
                .select()
                .then(mapTo(keys, (row) => row.id))
        );
    }

    /**
     * Authentication and permission for context that will throw
     * an error when not authenticated
     *
     * @throws AnonymousAccessDenied
     * @public
     */
    isAuthenticated() {
        if (!this.user) {
            const err = new Error('Anonymous access is denied.');
            err.name = 'AnonymousAccessDenied';
            throw err;
        }
    }
};
