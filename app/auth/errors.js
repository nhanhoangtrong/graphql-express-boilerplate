const { BadRequestError } = require('../errors');

class AuthError extends BadRequestError {
    constructor(message, fields) {
        super(message, fields);
        this.name = 'AuthError';
        this.statusCode = 401; // Unauthorized
    }
}

class SignupError extends BadRequestError {
    constructor(message, fields) {
        super(message, fields);
        this.name = 'SignupError';
        this.statusCode = 400; // Bad Request
    }
}

module.exports = {
    AuthError,
    SignupError,
};
