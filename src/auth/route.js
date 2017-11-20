import { Router } from 'express';
import passport from 'passport';
import { localStrategy } from './authStrategies';
import { User } from './models';

const route = Router();
passport.use(localStrategy);

// TODO: Handling passport local login state
route.post('/signup', (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    if (req.user) {
        return res.json({
            message: 'You have already logged in, please log out first.',
        });
    }

    if (!email) {
        return next(new Error('Email must be provided.'));
    } else if (!password) {
        return next(new Error('Password must be provided'));
    }

    return User.newUser({
        first_name,
        last_name,
        email,
        password,
    }).then(user => {
        delete user.password_hash;
        delete user.password_salt;
        return res.json(user);
    }).catch(next);
}).get('/verify', (req, res) => {
    // Verify with token
    const token = req.query.token;
    if (token) {

    }
    return res.status(400).json({
        message: 'Token mismatch.'
    });
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
