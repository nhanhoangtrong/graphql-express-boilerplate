const passport = require('passport');
const LocalStrategy = require('passport-local');
const knex = require('../../db/knex');
const bcrypt = require('bcrypt');
const { AuthError } = require('./errors');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await knex
            .table('users')
            .where({ id })
            .first();
        done(null, user);
    } catch (err) {
        done(err);
    }
});

exports.comparePassword = async function comparePassword(
    candidatePassword,
    hashedPassword
) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
};

exports.localStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true,
    },
    async (req, email, candidatePassword, done) => {
        try {
            const user = await knex
                .table('users')
                .where({ email })
                .first()
                .on('query-error', done);
            if (!user) {
                throw new AuthError('Email not found.', {
                    email: 'Not found.',
                });
            }

            // Then compare the candidate password with hashed password
            if (
                await exports.comparePassword(
                    candidatePassword,
                    user.password_hash
                )
            ) {
                return done(null, user);
            }

            return done(null, false);
        } catch (err) {
            return done(err);
        }
    }
);
