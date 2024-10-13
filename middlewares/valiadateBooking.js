const Joi = require('joi');


const bookingSchema = Joi.object({
userId: Joi.string()
    .required(),
slotId: Joi.string()
    .required(),
vehicleType: Joi.string()
    .valid('2 Wheeler', '4 Wheeler') 
    .required(),
timeFrom: Joi.date()
    .required(),
timeTo: Joi.date()
    .greater(Joi.ref('timeFrom'))
    .required(),
totalAmount: Joi.number()
    .positive()
    .required(),
paymentStatus: Joi.string()
    .valid('Pending', 'Completed', 'Failed') 
});

// Middleware function 
const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json(
        { 
            statusCode:400,
            success: false, 
            message: error.details[0].message 
        }
    );
  }

  next(); 
};

module.exports = validateBooking;
