const Student = require('../../modules/student');
const Course = require('../../modules/semester_course');


module.exports = new (
    class {
        async editStudent(req, res) {
            const student_id = req.params.id;

            if(isNaN(student_id)) {
                return res.status(204).json('ERROR STUDENT ID');
            }

            let{
                first_name,
                last_name,
                email,
                phone,
                password
            } = req.body;

            try {
                const edited_student = await Student.findOneAndUpdate(
                    {student_id},
                    {
                        first_name,
                        last_name,
                        email,
                        phone,
                        password
                    });

                if(!edited_student) {
                    return res.status(404).json('NOT FOUND: STUDENT');
                }

                return res.status(200).json(edited_student);

            } catch (error) {
                return res.status(500).json('ERROR: UPDATE STUDENT')
            }
        }

        async getCourse(req, res) {
            const courseId = req.params.id; 
          
            try {
              const course = await Course.findById(courseId);
          
              if (!course) {
                return res.status(404).json('COURSE NOT FOUND');
              }
          
              return res.status(200).json({
                data: course,
                message: 'GET COURSE: DONE'
              });
          
            } catch (error) {
              return res.status(500).json('ERROR: GET COURSE');
            }
          }
          

        async getCourses(req, res) {
            const major = req.query.major; // assuming the major is passed in as a query parameter
          
            try {
              const courses = await Course.find({ major: major });
          
              if (!courses || courses.length === 0) {
                return res.status(404).json('NO COURSES FOUND FOR MAJOR');
              }
          
              return res.status(200).json({
                data: courses,
                message: 'GET COURSES: DONE'
              });
          
            } catch (error) {
              return res.status(500).json('ERROR: GET COURSES');
            }
          }
          
    }
)