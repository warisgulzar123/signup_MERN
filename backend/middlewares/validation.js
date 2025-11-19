import Joi from "joi";

const signupvalidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Validation error', error: error.details[0].message });
    }
    next();
}

const loginvalidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Validation error', error: error.details[0].message });
    }
    next();
}
export { signupvalidation, loginvalidation };