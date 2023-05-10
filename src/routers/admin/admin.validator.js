const Joi = require('joi');

module.exports = new (
    class {
        validateGeneralFields(req, res, next) {
            const schema = Joi.object({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required().email(),
                phone: Joi.string().required().pattern(new RegExp(`^[0-9]{10}$`)),
                password: Joi.string().required(),
            });
        
            const {error, data} = schema.validate(req.body);
        
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
                professor_id: Joi.number().required(),
                faculty: Joi.string().required(),
                major: Joi.string().required(),
                education_level: Joi.string().required(),
            });
        
            const {error, data} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
        
            req.validatedData = {
                professor_id: data.professor_id,
                faculty: data.faculty,
                major: data.major,
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
    }
)
