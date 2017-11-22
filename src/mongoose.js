import mongoose from 'mongoose';
import logger from './logger';
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useMongoClient: true,
}).then(() => {
    logger.info('MongoDB Connection Successfully');
}).catch((err) => {
    logger.error('MongoDB Connection Error');
    logger.error(err.stack);
    process.exit(1);
});
