const express = require('express');
const { getAllBookings, createBooking, updateBooking,DeleteBookings,searchBookingsByYear} = require('../controllers/bookingController');
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route('/getall').get(protect,getAllBookings);
router.route('/add').post(protect,createBooking);
router.route('/update/:_id').put(protect,updateBooking);
router.route('/delete/:_id').delete(protect,DeleteBookings);
router.route('/search/:year').get(searchBookingsByYear);

module.exports = router;
