import DataLoader from 'dataloader';
import { User } from '../auth/models';
import { Types } from 'mongoose';
import { mapTo } from './utils';
/**
 * GraphQL Context class, storing request and user information, need to be created per request
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
        this.loadUserById = new DataLoader(
            keys => User.find({
                _id: {
                    $in: keys.map(key => Types.ObjectId(key))
                },
            }).exec().then(mapTo(keys, user => user._id.toString()))
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
}
