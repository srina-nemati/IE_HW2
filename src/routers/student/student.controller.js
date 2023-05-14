const Student = require('../../modules/student');

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
    }
)