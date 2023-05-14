const Joi = require('joi');

module.exports = new (
    class {
        addCourse(req, res, next) {
            const schema = Joi.object({
                course_id: Joi.string().required(),
                course_name: Joi.string().required(),
                major: Joi.string().required(),
                prerequisite: Joi.string(),
                needs: Joi.string(),
                unit: Joi.number().required(),
                class_date: Joi.date().required(),
                exam_date: Joi.date().required(),
                exam_location: Joi.string().required(),
                professor_name: Joi.string().required(),
                capacity: Joi.number().required(),
                semester_year: Joi.number().required()
            });

            const {error, value: val} = schema.validate(req.body);
        
            if(error) {
                return res.status(400).json({error: error.details[0].message });
            }
    
            req.validatedData = val;
        
            next();
        }

        editCourse(req, res, next) {
            const schema = Joi.object({
                course_name: Joi.string().required(),
                major: Joi.string().required(),
                prerequisite: Joi.string(),
                needs: Joi.string(),
                unit: Joi.number().required(),
                class_date: Joi.date().required(),
                exam_date: Joi.date().required(),
                exam_location: Joi.string().required(),
                professor_name: Joi.string().required(),
                capacity: Joi.number().required(),
                semester_year: Joi.number().required()
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