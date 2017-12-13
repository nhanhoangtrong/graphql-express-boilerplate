export class FieldError extends Error {
    constructor(message, fields) {
        super(message);
        this.name = 'FieldError';
        this.errors = {
            ...fields,
        };
    }
}
export class AuthError extends FieldError {
    constructor(message, fields) {
        super(message, fields);
        this.name = 'AuthError';
        this.statusCode = 401; // Unauthorized
    }
}

export class SignupError extends FieldError {
    constructor(message, fields) {
        super(message, fields);
        this.name = 'SignupError';
        this.statusCode = 400; // Bad Request
    }
}
