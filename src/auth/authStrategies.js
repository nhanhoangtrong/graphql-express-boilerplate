import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

const testerSalt = bcrypt.genSaltSync();
const tester = {
    id: 'tester_id',
    name: 'tester',
    email: 'tester@localhost',
    salt: testerSalt,
    password_hash: bcrypt.hashSync('password', testerSalt),
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, tester);
});

export const localStrategy = new LocalStrategy({
    usernameField: 'email',
}, (email, candidatePassword, done) => {
    if (email !== tester.email) {
        return done(null, false, {
            msg: `Email "${email}" not found`,
        });
    }

    bcrypt.compare(candidatePassword, tester.password_hash, (err, matched) => {
        if (matched) {
            return done(null, tester);
        }
        return done(err, matched, {
            msg: 'Password mismatch.',
        });
    });
});
