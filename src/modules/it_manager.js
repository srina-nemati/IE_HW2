const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const User = require('./user');

const ITmanagerSchema = mongoose.Schema(
    {
        employee_id: {
            required: true,
            type: Number,
            unique: true
        }
    }
);

ITmanagerSchema.plugin(timestamps);
const it_manager = User.discriminator('it_manager', ITmanagerSchema);
module.exports = it_manager;
