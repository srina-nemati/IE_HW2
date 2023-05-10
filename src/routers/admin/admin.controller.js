const bcrypt = require('bcrypt');
const {Professor} = require('./modules/professor')

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
    }
)