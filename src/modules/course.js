const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const courseSchema = mongoose.Schema({
    course_name: {
        required: true,
        type: String
    },
    prerequisite: {
        required: true,
        type: String
    },
    needs: {
        required: true,
        type: String
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