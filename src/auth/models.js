import knex from '../knex';
import bcrypt from 'bcrypt';

export class User {
    constructor(user) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password_salt = user.password_salt;
        this.password_hash = user.password_hash;
    }

    /**
     * Compare user's input password with hashed password
     *
     * @param {string} candidatePassword
     */
    async comparePassword(candidatePassword) {
        return bcrypt.compareSync(candidatePassword, this.password_hash);
    }
}

/**
 * Create a new User instance
 *
 * @param {object} user
 * @throws
 */
User.newUser = async (obj) => {
    const password_salt = bcrypt.genSaltSync();
    const password_hash = bcrypt.hashSync(obj.password, password_salt);
    const newUser = await knex.table('users')
        .insert({
            first_name: obj.first_name,
            last_name: obj.last_name,
            email: obj.email,
            password_salt,
            password_hash,
        })
        .returning('*');
    return new User(newUser[0]);
};

/**
 * Query user by id
 *
 * @param {string} id
 */
User.byId = async (id) => {
    const user = await knex.table('users')
        .where({ id })
        .first();
    if (!user) {
        const err = new Error('User not found.');
        err.name = 'UserNotFound';
        throw err;
    }
    return new User(user);
};

/**
 * Query user by email
 *
 * @param {string} email
 */
User.byEmail = async (email) => {
    const user = await knex.table('users')
        .where({ email })
        .first();
    if (!user) {
        const err = new Error('Email not found.');
        err.name = 'EmailNotFound';
        throw err;
    }
    return new User(user);
};
