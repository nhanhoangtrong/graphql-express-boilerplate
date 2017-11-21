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
            throw new SignupError('Email is not available.', ['email']);
        }
        if (!validator.isLength(password + '', { min: 8, max: 32 })) {
            throw new SignupError('Password must be in range (8-32) characters.', ['password']);
        }
        if (!validator.isLength(first_name + '', { min: 1, max: 100 }) || !validator.isLength(last_name + '', { min: 1, max: 100})) {
            throw new SignupError('First name or last name must be provided', ['first_name', 'last_name']);
        }

        const newUser = await knex.transaction(async (trx) => {
            const preUser = await trx.table('users').where({email}).first();
            if (preUser) {
                throw new SignupError('Email has been taken.', ['email']);
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
        if (err.name === 'SignupError') {
            return res.status(400).json({
                message: err.message,
                fields: err.fields,
            });
        }
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
    if (err.name === 'EmailNotFound') {
        res.status(400).json({
            message: err.message,
        });
    }
    next(err);
});

export default route;
