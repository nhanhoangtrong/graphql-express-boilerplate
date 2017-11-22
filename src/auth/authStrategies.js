import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from './models';

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export const localStrategy = new LocalStrategy({
    usernameField: 'email',
}, async (email, candidatePassword, done) => {
    try {
        const user = await User.findOne({email}).exec();
        if (!user) {
            throw new Error(`Email "${email}" hasn't been registered yet.`);
        }

        if (await user.comparePassword(candidatePassword)) {
            return done(null, user);
        }
        return done(null, false);
    } catch (err) {
        return done(err);
    }
});
