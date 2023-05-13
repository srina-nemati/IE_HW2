const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const userSchema = mongoose.Schema(
    {
        first_name: {
            required: true,
            type: String
        },
        last_name: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String,
            unique: true,
        },
        phone: {
            required: true,
            type: Number,
            length: 12,
        },
        password: {
            required: true,
            type: String
        },
    },
    {
        discriminatorKey: 'user_type',
    }
);

userSchema.plugin(timestamps);
const User = mongoose.model('User', userSchema);
module.exports = User;
