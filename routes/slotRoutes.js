const express = require('express');
const {getAllSlots,searchSlots,getSingleSlot,updateSlot} = require('../controllers/slotController');
const { protect } = require("../middlewares/authMiddleware");
const validateSlot = require('../middlewares/validateSlot');

const router = express.Router();

router.route('/getall').get(protect,getAllSlots);
router.route('/update/:_id').put(protect,validateSlot,updateSlot);
router.route('/search/:vehicleType').get(protect,searchSlots);
// router.route('/search/:vehicleType').get(protect,getSingleSlot);

module.exports = router;
