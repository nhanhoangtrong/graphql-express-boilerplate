class BadRequestError extends Error {
    constructor(message, fields = {}) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400; // Bad Request status
        this.errors = {
            ...fields,
        };
    }
}

module.exports = {
    BadRequestError,
};
