const Joi = require('joi');


const slotSchema = Joi.object({
  status: Joi.string()
    .valid('available', 'occupied', 'booked') 
    .required(),
  ratePerHour: Joi.number()
    .positive() 
    .required(),
  vehicleType: Joi.string()
    .valid('2 wheeler', '4 wheeler') 
    .required()
});

// Middleware function 
const validateSlot = (req, res, next) => {
  const { error } = slotSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json(
      { 
        statusCode:400,
        success: false, 
        message: error.details[0].message 
      });
  }

  next(); 
};

module.exports = validateSlot;
