const Student = require('../../modules/student.js');
const Professor = require('../../modules/professor.js');
const Course = require('../../modules/semester_course.js');


module.exports = new (
    class {
        async getStudents(req, res) {
            const students = await Student.find().populate().select("-password");
            res.json({
                data: students,
                message: 'GET STUDENTS: DONE'
            });
        }

        async getProfessors(req, res) {
            const profs = await Professor.find().populate().select("-password");
            res.json({
                data: profs,
                message: 'GET PROFESSORS: DONE'
            });
        }

        async getProf(req, res) {
            const prof_id = req.params.id;

            if(isNaN(prof_id)) {
                return res.status(404).sebd('ERROR PROFESSOR ID')
            }

            const prof = await Professor.findOne({prof_id}).select("-password");
            
            if(!prof) {
                res.status(404).json({
                    data: null,
                    message: 'NO PROFESSOR WITH THIS ID'
                });
                return;
            }

            res.status(200).json({
                data: prof,
                message: "FINDING PROFESSOR: DONE"
            });

        }

        async getCourses(req, res) {
            const courses = await Course.find().populate();
            res.json({
                data: courses,
                message: 'GET COURSES: DONE'
            });
        }

        async getCourse(req, res) {
            const course_id = req.params.id;

            if(isNaN(course_id)) {
                return res.status(404).sebd('ERROR COURSE ID')
            }

            const course = await Course.findOne({course_id});
            
            if(!course) {
                res.status(404).json({
                    data: null,
                    message: 'NO COURSE WITH THIS ID'
                });
                return;
            }

            res.status(200).json({
                data: course,
                message: "FINDING COURSE: DONE"
            });

        }

        async getStudent(req, res) {
            const student_id = req.params.id;

            if(isNaN(student_id)) {
                return res.status(404).sebd('ERROR STUDENT ID')
            }

            const student = await Student.findOne({student_id}).select("-password");
            
            if(!student) {
                res.status(404).json({
                    data: null,
                    message: 'NO STUDENT WITH THIS ID'
                });
                return;
            }

            res.status(200).json({
                data: student,
                message: "FINDING STUDENT: DONE"
            });

        }

        async addCourse(req, res) {
            const { 
                course_id,
                course_name,
                prerequisite,
                needs,
                unit,
                class_date,
                exam_date,
                exam_location,
                professor_name,
                capacity,
                semester_year
            } = req.body;

            const new_course = new Course({
                course_id,
                course_name,
                prerequisite,
                needs,
                unit,
                class_date,
                exam_date,
                exam_location,
                professor_name,
                capacity,
                semester_year
            });

            await new_course.save();
            res.status(200).json({
                data: new_course,
                message: 'Creating Course: DONE'
            });
        }

        async editCourse(req, res) {
            const id = req.params.id;

            if(isNaN(id)) {
                return res.status(204).json('ERROR COURSE ID');
            }

            let{
                course_name,
                prerequisite,
                needs,
                unit,
                class_date,
                exam_date,
                exam_location,
                professor_name,
                capacity,
                semester_year
            } = req.body;

            try {
                const edited = await Course.findOneAndUpdate(
                    {course_id: id},
                    {
                        course_name,
                        prerequisite,
                        needs,
                        unit,
                        class_date,
                        exam_date,
                        exam_location,
                        professor_name,
                        capacity,
                        semester_year
                    }
                );


                if(!edited) {
                    return res.status(404).json('NOT FOUND: COURSE');
                }
                return res.send(edited);

            } catch (error) {
                return res.status(500).json('ERROR: UPDATE COURSE')
            }
        }

        async checkCourseIdUnique(req, res, next) {
            const ID = req.body.course_id;
          
            const existingID = await Course.findOne({ course_id: ID });
          
            if (existingID) {
              return res.status(400).json({ error: 'The course_id already exists' });
            }
          
            next();
        }

        async deleteCourse(req, res) {
            const course_id = req.params.id;

            if(isNaN(course_id)) {
                return res.status(204).json('ERROR COURSE ID');
            }

            const deleted = await Course.findOneAndDelete({course_id});

            if(!deleted) {
                res.status(404).json('ERROR COURSE ID');
                return;
            }

            res.status(200).json({
                data: deleted,
                message: 'Deleting Course: DONE'
            });
        }
    }
)