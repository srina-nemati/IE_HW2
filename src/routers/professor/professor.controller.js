const Professor = require('../../modules/professor');
const Course = require('../../modules/semester_course');


module.exports = new (
    class {
        async editProfessor(req, res) {
            const professor_id = req.params.id;

            if(isNaN(professor_id)) {
                return res.status(204).json('ERROR PROFESSOR ID');
            }

            let{
                first_name,
                last_name,
                email,
                phone,
                password
            } = req.body;

            try {
                const edited = await Professor.findOneAndUpdate(
                    {professor_id},
                    {
                        first_name,
                        last_name,
                        email,
                        phone,
                        password
                    });

                if(!edited) {
                    return res.status(404).json('NOT FOUND: PROFESSOR');
                }

                return res.status(200).json(edited);

            } catch (error) {
                return res.status(500).json('ERROR: UPDATE PROFESSOR')
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