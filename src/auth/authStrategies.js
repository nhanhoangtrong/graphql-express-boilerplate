import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from './models';
import logger from '../logger';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.byId(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
}, async (req, email, candidatePassword, done) => {
    try {
        const user = await User.byEmail(email);
        if (await user.comparePassword(candidatePassword)) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err);
    }
});
