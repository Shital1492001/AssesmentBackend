const Joi = require('joi'); 

const validateRegisterUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    contactNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(
      { 
        statusCode:400,
        success:false,
        error: error.details[0].message 
      });
  }

  next(); //call next middleware
};


const validateLoginUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(
      { 
        statusCode:400,
        success:false,
        error: error.details[0].message 
      });
  }

  next(); 
};

module.exports = { validateRegisterUser, validateLoginUser };
