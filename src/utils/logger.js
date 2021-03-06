import { createLogger, transports, format} from 'winston';
const { combine, timestamp, label, splat, simple, prettyPrint } = format;

/**
 * Your logger configuration come here
 */

export const consoleTransport = new transports.Console({
    level: 'info',
});

export const loggerFormating = (format) => {
    if (format === 'combined') {
        return combine(
            timestamp(),
            label({
                label: {
                    platform: process.platform,
                    pid: process.pid,
                },
            }),
            prettyPrint()
        );
    }

    return combine(
        splat(),
        simple()
    );
};

const logger = createLogger({
    format: loggerFormating(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'),
    level: 'info',
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
    constructor(level, meta) {
        this.level = level;
        this.meta = meta;
    }
    /**
     * Write a message to infor logger
     *
     * @param {string} info
     * @public
     */
    write(info) {
        logger.log(this.level, info.replace('\n', ''), this.meta);
    }
}
