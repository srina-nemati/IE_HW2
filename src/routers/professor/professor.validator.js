const Joi = require('joi');

module.exports = new (
    class {
        editProfessor(req, res, next) {
            const schema = Joi.object({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required().email(),
                phone: Joi.string().required().pattern(new RegExp(`^[0-9]{12}$`)),
                password: Joi.string().required()
            });

            const {error, value: val} = schema.validate(req.body);

            if (error) {
                return res.status(400).json({error: error.details[0].message});
            }

            req.validatedData = val;
            
            next();
        }
    }
)