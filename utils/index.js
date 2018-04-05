const debug = require('debug');
exports.debug = (ns) => debug('graphql-express:' + ns);
exports.defaultLogger = require('./logger').default;
exports.LoggerStream = require('./logger').LoggerStream;
