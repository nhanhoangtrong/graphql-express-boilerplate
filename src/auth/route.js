import { Router } from 'express';
import passport from 'passport';
import { localStrategy } from './authStrategies';

const route = Router();
passport.use(localStrategy);

// TODO: Handling passport local login state
route.post('/signup', (req, res, next) => {
    next(new Error('Under-construction'));
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
