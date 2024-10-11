const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    slotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot', // Reference to the Slot model
        required: true,
    },
    vehicleType: {
        type: String,
        enum: ['2 Wheeler', '4 Wheeler'],
        required: true,
    },
    timeFrom: {
        type: Date,
        required: true,
    },
    timeTo: {
        type: Date,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
}, { timestamps: true });

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;
