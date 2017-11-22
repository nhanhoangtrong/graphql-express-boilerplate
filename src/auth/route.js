import { Router } from 'express';
import passport from 'passport';
import { localStrategy } from './authStrategies';
import { User } from './models';
import validator from 'validator';

const route = Router();
passport.use(localStrategy);

// TODO: Handling passport local login state
route.post('/signup', async (req, res, next) => {

    try {
        const { first_name, last_name, email, password } = req.body;

        // Validate user signup form
        if (!validator.isEmail(email + '')) {
            throw new Error(`Email "${email}" isn't valid.`);
        }
        if (!validator.isLength(password + '', { max: 32, min: 8})) {
            throw new Error(`Password must be in range [8, 32]`);
        }
        if (!validator.isLength(first_name + '', {max: 100, min: 1}) && !validator.isLength(last_name + '', {max: 100, min: 1})) {
            throw new Error('First name or last name must be provided.');
        }

        const newUser = await User.create({
            firstName: first_name,
            lastName: last_name,
            email,
            password,
        });

        return res.json({
            id: newUser._id,
            firstName: first_name,
            lastName: last_name,
            email,
        });
    } catch (err) {
        return next(err);
    }

}).post('/login', passport.authenticate('local'), (req, res) => {
    // Return a json object notifying that login is successfully
    res.json({
        message: 'You have been logged in successfully.',
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
});

export default route;
