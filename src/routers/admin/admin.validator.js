const Joi = require('joi');

module.exports = new (
    class {      
        createProf(req, res, next) {
            const schema = Joi.object({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required().email(),
                phone: Joi.string().required().pattern(new RegExp(`^[0-9]{12}$`)),
                password: Joi.string().required(),
                professor_id: Joi.string().required(),
                major: Joi.string().required(),
                faculty: Joi.string().required(),
                education_level: Joi.string().required()
            });

            const {error, value: val} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
    
            req.validatedData = val;
        
            next();
        }

        updateProf(req, res, next) {
            const schema = Joi.object({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required().email(),
                phone: Joi.string().required().pattern(new RegExp(`^[0-9]{12}$`)),
                password: Joi.string().required(),
                faculty: Joi.string().required(),
                major: Joi.string().required(),
                education_level: Joi.string().required(),
            });
        
            const {error, value: val} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = val;
        
            next();
        }

        createStudent(req, res, next) {
            const schema = Joi.object({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required().email(),
                phone: Joi.string().required().pattern(new RegExp(`^[0-9]{12}$`)),
                password: Joi.string().required(),
                student_id: Joi.string().required(),
                score: Joi.number().required(),
                level: Joi.string().required(),
                faculty: Joi.string().required(),
                major: Joi.string().required(),
                entrance_year: Joi.number().required(),
                semester_year: Joi.number().required()
            });
        
            const {error, value: val} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = val;
        
            next();
        }

        updateStudent(req, res, next) {
            const schema = Joi.object({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required().email(),
                phone: Joi.string().required().pattern(new RegExp(`^[0-9]{12}$`)),
                password: Joi.string().required(),
                score: Joi.number().required(),
                level: Joi.string().required(),
                major: Joi.string().required(),
                faculty: Joi.string().required(),
                entrance_year: Joi.number().required(),
                semester_year: Joi.number().required()
            });
        
            const {error, value: val} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = val;
        
            next();
        }

        createManager(req, res, next) {
            const schema = Joi.object({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required().email(),
                phone: Joi.string().required().pattern(new RegExp(`^[0-9]{12}$`)),
                password: Joi.string().required(),
                employee_id: Joi.string().required(),
                faculty: Joi.string().required()
            });
        
            const {error, value: val} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = val;
        
            next();
        }

        updateManager(req, res, next) {
            const schema = Joi.object({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required().email(),
                phone: Joi.string().required().pattern(new RegExp(`^[0-9]{12}$`)),
                password: Joi.string().required(),
                faculty: Joi.string().required()
            });
        
            const {error, value: val} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = val;
        
            next();
        }
    }
)
