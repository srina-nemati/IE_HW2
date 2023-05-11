const bcrypt = require("bcrypt");
const {Student} = require('E:\\SBU\\Term8\\Web Application Development\\HWs\\2\\code\\src\\modules\\student.js');
const {Professor} = require('E:\\SBU\\Term8\\Web Application Development\\HWs\\2\\code\\src\\modules\\professor.js');

module.exports = new (
    class{
        async createProf(req, res) {
            const { 
                first_name,
                last_name,
                email,
                phone,
                password,
                professor_id,
                major,
                faculty,
                education_level,
            } = req.body;

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            const new_prof = new Professor({
                first_name,
                last_name,
                email,
                phone,
                password,
                professor_id,
                major,
                faculty,
                education_level,
            });

            await new_prof.save();
            console.log(new_prof);
            res.status(200).json({
                data: new_prof,
                message: 'Creating Professor: DONE'
            });
        }

        async updateProf(req, res) {
            const professor_id = req.params.id;

            if(isNaN(professor_id)) {
                return res.status(404).json('ERROR PROFESSOR ID');
            }

            let{
                first_name,
                last_name,
                email,
                phone,
                password,
                major,
                faculty,
                education_level,
            } = req.body;

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            try {
                const edited_prof = await Professor.findOneAndUpdate(
                    {professor_id},
                    {
                        first_name,
                        last_name,
                        email,
                        phone,
                        password,
                        major,
                        faculty,
                        education_level,
                    },
                    {new: true, select: "-password"}
                );

                if(!edited_prof) {
                    return res.status(404).json('NOT FOUND: PROFESSOR');
                }
                return res.send(edited_prof);

            } catch (error) {
                return res.status(500).json('ERROR: UPDATE PROFESSOR')
            }
        }

        async deleteProf(req, res) {
            const professor_id = req.params.id;

            if(isNaN(professor_id)) {
                return res.status(404).json('ERROR PROFESSOR ID');
            }

            const deleted_prof = await Professor.findOneAndDelete({professor_id});

            if(!deleted_prof) {
                res.status(404).json('ERROR PROFESSOR ID');
                return;
            }

            if(deleted_prof.user_type != 'Professor') {
                res.send('NOT PROFESSOR');
            }

            res.status(200).json({
                data: deleted_prof,
                message: 'Deleting Professor: DONE'
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

        async getProfs(req, res) {
            const profs = await Professor.find().populate().select("-password");
            res.json({
                data: profs,
                message: 'GET PROFESSORS: DONE'
            });
        }

        async createStudent(req, res) {
            const { 
                first_name,
                last_name,
                email,
                phone,
                password,
                student_id,
                score,
                level,
                major,
                faculty,
                entrance_year,
                semester_year
            } = req.body;

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            const new_student = new Student({
                first_name,
                last_name,
                email,
                phone,
                password,
                student_id,
                score,
                level,
                major,
                faculty,
                entrance_year,
                semester_year
            });

            await new_student.save();
            console.log(new_student);
            res.status(200).json({
                data: new_student,
                message: 'Creating Student: DONE'
            });
        }

        async updateStudent(req, res) {
            const student_id = req.params.id;

            if(isNaN(student_id)) {
                return res.status(404).json('ERROR STUDENT ID');
            }

            let{
                first_name,
                last_name,
                email,
                phone,
                password,
                score,
                level,
                major,
                faculty,
                entrance_year,
                semester_year
            } = req.body;

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            try {
                const edited_student = await Student.findOneAndUpdate(
                    {student_id},
                    {
                        first_name,
                        last_name,
                        email,
                        phone,
                        password,
                        score,
                        level,
                        major,
                        faculty,
                        education_level,
                        entrance_year,
                        semester_year
                    },
                    {new: true, select: "-password"}
                );

                if(!edited_student) {
                    return res.status(404).json('NOT FOUND: STUDENT');
                }
                return res.send(edited_student);

            } catch (error) {
                return res.status(500).json('ERROR: UPDATE STUDENT')
            }
        }

        async deleteStudent(req, res) {
            const student_id = req.params.id;

            if(isNaN(student_id)) {
                return res.status(404).json('ERROR STUDENT ID');
            }

            const deleted_student = await Student.findOneAndDelete({student_id});

            if(!deleted_student) {
                res.status(404).json('ERROR STUDENT ID');
                return;
            }

            if(deleted_student.user_type != 'student') {
                res.send('NOT STUDENT');
            }

            res.status(200).json({
                data: deleted_student,
                message: 'Deleting Student: DONE'
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

        async getStudents(req, res) {
            const students = await Student.find().populate().select("-password");
            res.json({
                data: students,
                message: 'GET STUDENTS: DONE'
            });
        }
    }
)