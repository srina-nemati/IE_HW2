const Joi = require('joi');

module.exports = {
  login(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });

    const { error, value: val } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    req.validatedData = val;

    next();
  },
};
