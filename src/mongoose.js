import mongoose from 'mongoose';
import { debug, logger } from './utils';
mongoose.Promise = Promise;

const mongoDebug = debug('mongoose');

export async function connectMongoose() {
    mongoDebug('Start connection');
    return mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useMongoClient: true,
    }).then(() => {
        mongoDebug('Connection Successfully');
    }).catch((err) => {
        logger.error(err.stack, {
            from: 'mongoose'
        });
        process.exit(1);
    });
}
