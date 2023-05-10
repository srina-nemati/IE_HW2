const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');

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
            type: String,
            length: 12,
        },
        password: {
            required: true,
            type: String
        },
    },
    {
        discreminatorKey: 'user_type',
    }
);

userSchema.plugin(timestamps);
const User = mongoose.model('User', userSchema);
module.exports = User;