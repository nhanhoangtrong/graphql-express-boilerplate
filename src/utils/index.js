export { default as logger, LoggerStream as LoggerStream } from './logger';
import debug  from 'debug';

const debugUtil = ns => debug('graphql-express:' + ns);

export { debugUtil as debug};
