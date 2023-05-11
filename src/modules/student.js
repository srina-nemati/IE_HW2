const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const User = require('./user');

const studentSchema = mongoose.Schema(
    {
        student_id: {
            required: true,
            type: Number,
            unique: true
        },
        score: {
            required: true,
            type: Number
        },
        level: {
            required: true,
            type: String
        },
        major: {
            required: true,
            type: String
        },
        faculty: {
            required: true,
            type: String
        },
        entrance_year: {
            required: true,
            type: Number
        },
        semester_year: {
            required: true,
            type: Number
        }
    }
);

studentSchema.plugin(timestamps);
const Student = User.discriminator('Student', studentSchema);
module.exports = Student;