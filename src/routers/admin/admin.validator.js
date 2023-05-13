const Joi = require('joi');

module.exports = new (
    class {
        validateGeneralFields(req, res, next) {
            const schema = Joi.object({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required().email(),
                phone: Joi.string().required().pattern(new RegExp(`^[0-9]{12}$`)),
                password: Joi.string().required(),
            });  

            const {error, data} = schema.validate(req.body);
            console.log(data)
            
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                password: data.password
            };
        
            next();
        }
        
        createProf(req, res, next) {
            const schema = Joi.object({
                professor_id: Joi.string().required(),
                major: Joi.string().required(),
                faculty: Joi.string().required(),
                education_level: Joi.string().required(),
            });
        
            const {error, data} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = {
                professor_id: data.professor_id,
                major: data.major,
                faculty: data.faculty,
                education_level: data.education_level
            };
        
            next();
        }

        updateProf(req, res, next) {
            const schema = Joi.object({
                faculty: Joi.string().required(),
                major: Joi.string().required(),
                education_level: Joi.string().required(),
            });
        
            const {error, data} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = {
                faculty: data.faculty,
                major: data.major,
                education_level: data.education_level
            };
        
            next();
        }

        createStudent(req, res, next) {
            const schema = Joi.object({
                student_id: Joi.string().uuid().required(),
                score: Joi.number().required(),
                level: Joi.string().required(),
                faculty: Joi.string().required(),
                major: Joi.string().required(),
                entrance_year: Joi.number().required(),
                semester_year: Joi.number().required()
            });
        
            const {error, data} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = {
                student_id: data.student_id,
                score: data.score,
                level: data.level,
                faculty: data.faculty,
                major: data.major,
                entrance_year: data.entrance_year,
                semester_year: data.semester_year
            };
        
            next();
        }

        updateStudent(req, res, next) {
            const schema = Joi.object({
                score: Joi.number().required(),
                level: Joi.string().required(),
                major: Joi.string().required(),
                faculty: Joi.string().required(),
                entrance_year: Joi.number().required(),
                semester_year: Joi.number().required()
            });
        
            const {error, data} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = {
                score: data.score,
                level: data.level,
                major: data.major,
                faculty: data.faculty,
                entrance_year: data.entrance_year,
                semester_year: data.semester_year
            };
        
            next();
        }

        createManager(req, res, next) {
            const schema = Joi.object({
                employee_id: Joi.string().uuid().required(),
                faculty: Joi.string().required()
            });
        
            const {error, data} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = {
                employee_id: data.employee_id,
                faculty: data.faculty
            };
        
            next();
        }

        updateManager(req, res, next) {
            const schema = Joi.object({
                faculty: Joi.string().required()
            });
        
            const {error, data} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = {
                faculty: data.faculty
            };
        
            next();
        }
    }
)
