const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  status: { 
    type: String, 
    required: true, 
    default: 'available',
    enum: ['available', 'occupied', 'booked'], 
  },
  ratePerHour: { 
    type: Number, 
    required: true,
    min: [0, 'Rate per hour must be a positive number'], 
  },
  vehicleType: { 
    type: String, 
    required: true, 
    enum: ['2 wheeler', '4 wheeler'], 
  }
}, {
  timestamps: true,     //two additional fields 1 createdAt  2 updatedAt  //store date and time
});

module.exports = mongoose.model('Slot', SlotSchema);
