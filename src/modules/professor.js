const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const User = require('./user');

const professorSchema = mongoose.Schema(
    {
        professor_id: {
            required: true,
            type: Number,
            unique: true
        },
        major: {
            required: true,
            type: String
        },
        faculty: {
            required: true,
            type: String
        },
        education_level: {
            required: true,
            type: String
        }
    }
);

professorSchema.plugin(timestamps);
const Professor = User.discriminator('Professor', professorSchema);
module.exports = Professor;
