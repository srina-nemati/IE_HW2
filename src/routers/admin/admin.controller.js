const bcrypt = require("bcrypt");
const Student = require('../../modules/student.js');
const Professor = require('../../modules/professor.js');
const EducationalManager = require("../../modules/educational_manager");

module.exports = new (
    class{
        async checkProfessorIdUnique(req, res, next) {
            const professorId = req.body.professor_id;
          
            const existingProfessor = await Professor.findOne({ professor_id: professorId });
          
            if (existingProfessor) {
              return res.status(400).json({ error: 'The professor_id already exists' });
            }
          
            next();
        }

        async checkStudentIdUnique(req, res, next) {
            const ID = req.body.student_id;
          
            const existingID = await Student.findOne({ student_id: ID });
          
            if (existingID) {
              return res.status(400).json({ error: 'The student_id already exists' });
            }
          
            next();
        }

        async checkManagerIdUnique(req, res, next) {
            const ID = req.body.employee_id;
          
            const existingID = await EducationalManager.findOne({ employee_id: ID });
          
            if (existingID) {
              return res.status(400).json({ error: 'The employee_id already exists' });
            }
          
            next();
        }

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
            const hash_password = await bcrypt.hash(password, salt);

            const new_prof = new Professor({
                first_name,
                last_name,
                email,
                phone,
                password: hash_password,
                professor_id,
                major,
                faculty,
                education_level,
            });

            await new_prof.save(); 

            res.status(200).json({
                data: new_prof,
                message: 'Creating Professor: DONE'
            });
        }

        async updateProf(req, res) {
            const professor_id = req.params.id;

            if(isNaN(professor_id)) {
                return res.status(204).json('ERROR PROFESSOR ID');
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
            const hash_password = await bcrypt.hash(password, salt);

            try {
                const edited_prof = await Professor.findOneAndUpdate(
                    {professor_id},
                    {
                        first_name,
                        last_name,
                        email,
                        phone,
                        password: hash_password,
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
                return res.status(204).json('ERROR PROFESSOR ID');
            }

            const deleted_prof = await Professor.findOneAndDelete({professor_id});

            if(!deleted_prof) {
                res.status(404).json('ERROR PROFESSOR ID');
                return;
            }

            if(deleted_prof.user_type != 'Professor') {
                res.status(400).json('NOT PROFESSOR');
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
            const hash_password = await bcrypt.hash(password, salt);

            const new_student = new Student({
                first_name,
                last_name,
                email,
                phone,
                password: hash_password,
                student_id,
                score,
                level,
                major,
                faculty,
                entrance_year,
                semester_year
            });

            await new_student.save();
            res.status(200).json({
                data: new_student,
                message: 'Creating Student: DONE'
            });
        }

        async updateStudent(req, res) {
            const student_id = req.params.id;

            if(isNaN(student_id)) {
                return res.status(204).json('ERROR STUDENT ID');
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
            const hash_password = await bcrypt.hash(password, salt);

            try {
                const edited_student = await Student.findOneAndUpdate(
                    {student_id},
                    {
                        first_name,
                        last_name,
                        email,
                        phone,
                        password: hash_password,
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
                return res.status(204).json('ERROR STUDENT ID');
            }

            const deleted_student = await Student.findOneAndDelete({student_id});

            if(!deleted_student) {
                res.status(404).json('ERROR STUDENT ID');
                return;
            }

            if(deleted_student.user_type != 'student') {
                res.status(400).json('NOT STUDENT');
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

        async createManager(req, res) {
            const { 
                first_name,
                last_name,
                email,
                phone,
                password,
                employee_id,
                faculty
            } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(password, salt);

            const new_manager = new EducationalManager({
                first_name,
                last_name,
                email,
                phone,
                password: hash_password,
                employee_id,
                faculty
            });

            await new_manager.save();
            res.status(200).json({
                data: new_manager,
                message: 'Creating Manager: DONE'
            });
        }

        async updateManager(req, res) {
            const manager_id = req.params.id;

            if(isNaN(manager_id)) {
                return res.status(204).json('ERROR MANAGER ID');
            }

            let{
                first_name,
                last_name,
                email,
                phone,
                password,
                faculty
            } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(password, salt);

            try {
                const edited_manager = await EducationalManager.findOneAndUpdate(
                    {manager_id},
                    {
                        first_name,
                        last_name,
                        email,
                        phone,
                        password: hash_password,
                        faculty
                    },
                    {new: true, select: "-password"}
                );

                if(!edited_manager) {
                    return res.status(404).json('NOT FOUND: MANAGER');
                }
                return res.send(edited_manager);

            } catch (error) {
                return res.status(500).json('ERROR: UPDATE MANAGER')
            }
        }

        async deleteManager(req, res) {
            const manager_id = req.params.id;

            if(isNaN(manager_id)) {
                return res.status(204).json('ERROR MANAGER ID');
            }

            const deleted_manager = await EducationalManager.findOneAndDelete({manager_id});

            if(!deleted_manager) {
                res.status(404).json('ERROR MANAGER ID');
                return;
            }

            if(deleted_manager.user_type != 'educational_manager') {
                res.status(400).json('NOT MANAGER');
            }

            res.status(200).json({
                data: deleted_manager,
                message: 'Deleting Manager: DONE'
            });
        }

        async getManager(req, res) {
            const manager_id = req.params.id;

            if(isNaN(manager_id)) {
                return res.status(404).sebd('ERROR MANAGER ID')
            }

            const manager = await EducationalManager.findOne({manager_id}).select("-password");
            
            if(!manager) {
                res.status(404).json({
                    data: null,
                    message: 'NO MANAGER WITH THIS ID'
                });
                return;
            }

            res.status(200).json({
                data: manager,
                message: "FINDING MANAGER: DONE"
            });

        }

        async getManagers(req, res) {
            const managers = await EducationalManager.find().populate().select("-password");
            res.json({
                data: managers,
                message: 'GET MANAGERS: DONE'
            });
        }
    }
)