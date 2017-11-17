import { createLogger, transports, format} from 'winston';
const { combine, timestamp, label, printf } = format;

/**
 * Your logger configuration come here
 */
const loggerFormat = printf(info => `[${info.timestamp}][${info.label}] ${info.level}: ${info.message}`);

export const consoleTransport = new transports.Console({
    handleExceptions: true,
    json: false,
    colorize: true
});

const logger = createLogger({
    format: combine(
        label({ label: 'GraphQL API'}),
        timestamp(),
        loggerFormat
    ),
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    transports: [
        consoleTransport,
    ],
    exitOnError: false,
});
export default logger;

/**
 * A Writable Stream for output information on our logger
 * @public
 */
export class LoggerStream {
    /**
     * Write a message to infor logger
     *
     * @param {string} info
     * @public
     */
    write(info) {
        logger.info(info);
    }
}
