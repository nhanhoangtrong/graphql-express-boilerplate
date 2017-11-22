import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    salt: String,

}, { timestamps: true });

/**
 * Hashing password before saving
 */
userSchema.pre('save', async function hashBeforeSave(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

/**
 * Compare user's password based on hashed password
 *
 * @param {string} candidatePassword
 * @async
 * @returns {Boolean}
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
