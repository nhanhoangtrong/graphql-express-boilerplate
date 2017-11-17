/**
 * GraphQL Context class, storing request and user information
 *
 * @public
 */
export default class Context {
    /**
     * Constructing a new context
     *
     * @param {Express.Request} req
     */
    constructor(req) {
        this.req = req;
        this.user = req.user;
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
}
