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

        }

        async getCourses(req, res) {
            const courses = (await Course.find().populate()).filter();
            res.json({
                data: courses,
                message: 'GET COURSES: DONE'
            });
        }
    }
)