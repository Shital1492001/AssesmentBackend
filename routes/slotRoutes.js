const express = require('express');
const {createSlot,getAllSlots,searchSlots,getSingleSlot,updateSlot} = require('../controllers/slotController');
const { authorizedToken } = require("../middlewares/authMiddleware");
const validateSlot = require('../middlewares/validateSlot');

const router = express.Router();

router.route('/add').post(authorizedToken,validateSlot,createSlot);
router.route('/getall').get(authorizedToken,getAllSlots);
router.route('/update/:_id').put(authorizedToken,updateSlot);
router.route('/search/:vehicleType').get(authorizedToken,searchSlots);
// router.route('/search/:vehicleType').get(authorizedToken,getSingleSlot);

module.exports = router;
