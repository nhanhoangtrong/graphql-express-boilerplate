import { join } from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import connectRedis from 'connect-redis';
import logger, { LoggerStream } from './logger';
import redisClient from './redis';

import { authRoute } from './auth';
import { graphqlRoute } from './graphql';

// First create a new Express application
const app = express();
const isDev = process.env.NODE_ENV === 'development';

app.set('host', process.env.HOST || 'localhost');
app.set('port', parseInt(process.env.PORT, 10) || 8080);
app.set('debug', isDev);
app.set('trust proxy', 'loopback');
app.use(morgan(isDev ? 'dev' : 'combined', {
    stream: new LoggerStream(),
}));
app.use(cors({
    // Configures the Access-Control-Allow-Origin CORS header to allow by default
    origin(origin, cb) {
        const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
        cb(null, whitelist.includes(origin));
    },
    // Configures the Access-Control-Allow-Credentials CORS header
    credentials: true,
    // Some legacy browsers(IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const RedisStore = connectRedis(session);
app.use(session({
    resave: true,
    saveUninitialized: true,
    name: process.env.SESSION_NAME || 'session_id',
    secret: process.env.SESSION_SECRET || 'session_secret',
    store: new RedisStore({
        client: redisClient,
    }),
}));

/**
 * Authentication features
 */
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoute);

app.use('/static', express.static(join(process.cwd(), 'static')));

/**
 * Setting up the graphql and graphiql features
 */
app.use('/graphql', graphqlRoute);
// Enable graphiql in development
if (isDev) {
    const graphiql = require('apollo-server-express').graphiqlExpress;
    app.use('/graphiql', graphiql({
        endpointURL: '/graphql',
    }));
}

/**
 * Configuring your own features
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

/**
 * Handling the 404 - Not Found
 */
app.use((req, res) => {
    if (req.xhr || req.is('application/json')) {
        return res.status(404).json({
            message: 'Not Found',
        });
    }
    return res.status(404).send('Page Not Found');
});
/**
 * Configure the default error handler
 */
// Logging the error to logger
app.use((err, req, res, next) => {
    // Logging the error information, includes name, message, stacktrace
    logger.error(err.name);
    logger.error(err.message);
    logger.error(err.stack);

    next(err);
});
// Set the default response status for error
app.use((err, req, res, next) => {
    // Check if error statusCode has been set or not
    if (res.statusCode === 200) {
        // If not set, assign the default status to Internal Server Error
        res.statusCode = 500;
    }

    next(err);
});
// Finally, add the default error handler if not handled
app.use((err, req, res, next) => {
    // Check if headers is sent
    if (req.headersSent) {
        return next(err);
    }

    // Check if AJAX request, send the JSON error
    if (req.xhr) {
        return res.json({
            name: err.name,
            message: err.message,
        });
    }
    return res.send(`${err.name}: ${err.message}`);
});

export default app;
