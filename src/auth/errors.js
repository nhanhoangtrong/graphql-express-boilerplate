export class AuthError extends Error {
    constructor(message, fields) {
        super(message);
        this.name = 'AuthError';
        this.fields = [
            ...fields,
        ];
    }
}

export class SignupError extends Error {
    constructor(message, fields) {
        super(message);
        this.name = 'SignupError';
        this.fields = [
            ...fields,
        ];
    }
}
