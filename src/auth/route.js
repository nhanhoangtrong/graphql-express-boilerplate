import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { localStrategy } from './authStrategies';
import knex from '../knex';
import { SignupError } from './errors';
import validator from 'validator';
// import logger from '../logger';

const route = Router();
passport.use(localStrategy);

// TODO: Handling passport local login state
route.post('/signup', async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    try {

        if (!validator.isEmail(email + '')) {
            throw new SignupError('Errors on registering.', { 'email': 'Email is not valid.'});
        }
        if (!validator.isLength(password + '', { min: 8, max: 32 })) {
            throw new SignupError('Errors on registering.', { 'password': 'Password must be in range (8-32) characters.' });
        }
        if (!validator.isLength(first_name + '', { min: 1, max: 100 }) || !validator.isLength(last_name + '', { min: 1, max: 100})) {
            throw new SignupError('Errors on registering.', {
                'first_name': 'Must be provided.',
                'last_name': 'Must be provided.'});
        }

        const newUser = await knex.transaction(async (trx) => {
            const preUser = await trx.table('users').where({email}).first();
            if (preUser) {
                throw new SignupError('Errors on registering.', { 'email': 'Email has been taken.' });
            }

            const password_salt = bcrypt.genSaltSync();
            const password_hash = bcrypt.hashSync(password, password_salt);
            return await trx.insert({
                first_name,
                last_name,
                email,
                password_salt,
                password_hash,
            }).into('users').returning([
                'first_name',
                'last_name',
                'email',
            ]);
        });

        return res.json(newUser);
    } catch (err) {
        return next(err);
    }
}).get('/verify', (req, res) => {
    // Verify with token
    return res.status(400).json({
        message: 'Token mismatch.'
    });
}).post('/login', passport.authenticate('local'), (req, res) => {
    // Return a json object notifying that login is successfully
    res.json({
        message: `You have been logged in as ${req.user.first_name}.`,
    });
}).get('/logout', (req, res) => {
    // Check if user is logged in or not
    if (req.user) {
        // If logged in, notifying that user has been logged out
        req.logout();
        return res.json({
            message: 'Logged out successfully.',
        });
    }
    // If not, notifying that user's already logged out
    return res.json({
        message: 'You have already logged out.'
    });
}).get('/is-auth', (req, res) => {
    // Check if user is authenticated, then return auth status
    if (req.user) {
        return res.json({
            message: 'Authenticated.'
        });
    }
    return res.status(401).json({
        message: 'Unauthenticated.',
    });
})
.use((err, req, res, next) => {
    if (err.name === 'SignupError' || err.name === 'AuthError') {
        return res.status(err.statusCode).json({
            name: err.name,
            message: err.message,
            errors: err.errors,
        });
    }

    next(err);
});

export default route;
