const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const User = require('./user');

const EducationalManagerSchema = mongoose.Schema(
    {
        employee_id: {
            required: true,
            type: Number,
            unique: true
        },
        faculty: {
            required: true,
            type: String
        }
    }
);

EducationalManagerSchema.plugin(timestamps);
const EducationalManager = User.discriminator('educational_manager', studentSchema);
module.exports = EducationalManager;