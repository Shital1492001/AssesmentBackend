const express = require('express');
const { getAllBookings, createBooking, updateBooking,DeleteBookings,Statistics} = require('../controllers/bookingController');
const { authorizedToken } = require("../middlewares/authMiddleware");
const validateBooking = require('../middlewares/valiadateBooking');

const router = express.Router();

router.route('/getall').get(authorizedToken,getAllBookings);
router.route('/add').post(authorizedToken,validateBooking,createBooking);
router.route('/update/:_id').put(authorizedToken,updateBooking);
router.route('/delete/:_id').delete(authorizedToken,DeleteBookings);
router.route('/stats/:year').get(authorizedToken,Statistics)


module.exports = router;
