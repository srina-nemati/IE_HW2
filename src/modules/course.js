const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const courseSchema = mongoose.Schema({
    course_id: {
        required: true,
        unique: true,
        type: Number
    },
    course_name: {
        required: true,
        type: String
    },
    prerequisite: {
        required: false,
        type: String,
        default: "-"
    },
    needs: {
        required: false,
        type: String,
        default: "-"
    },
    unit: {
        required: true,
        type: Number
    }
},
{
    discriminatorKey: 'course_type',
});

courseSchema.plugin(timestamps);
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;