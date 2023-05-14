const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Course = require('./course');

const semester_courseSchema = mongoose.Schema({
    class_date: { 
        required: true,
        type: Date
    },
    exam_date: { 
        required: true,
        type: Date
    },
    exam_location: {
        required: true,
        type: String
    },
    professor_name: { 
        required: true, 
        type: String
    },
    capacity: { 
        required: true,
        type: Number
    },
    semester_year: {
        required: true,
        type: Number
    }
    
});

semester_courseSchema.plugin(timestamps);
const semester_course = Course.discriminator('semester_course', semester_courseSchema);
module.exports = semester_course;