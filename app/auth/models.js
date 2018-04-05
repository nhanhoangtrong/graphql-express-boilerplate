const bcrypt = require('bcrypt');

exports.User = class {
    constructor(user) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password_salt = user.password_salt;
        this.password_hash = user.password_hash;
    }

    /**
     * Compare user's input password with hashed password
     *
     * @param {string} candidatePassword
     */
    async comparePassword(candidatePassword) {
        return bcrypt.compareSync(candidatePassword, this.password_hash);
    }
};
