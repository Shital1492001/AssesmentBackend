const BookingModel = require('../models/Booking'); 

const getAllBookings = async (req, res) => {
    try {
        // Fetch all bookings from the database
        const bookings = await BookingModel.find({userId:req.user._id});

        if (!bookings || bookings.length === 0) {
            return res.status(404).json(
              { 
                StatusCode:404,
                success: false,
                message: 'No bookings available',
                bookings:bookings 
              });
        }

        
        res.status(200).json(
          {
            StatusCode:200,
            success: true,
            message:"Available Booking...",
            bookings:bookings
          });
    } catch (error) {
        
        console.error(`Error fetching bookings: ${error.message}`);
        res.status(500).json(
          { 
            StatusCode:500,
            success: false,
            message: 'Server error' 
          });
    }
};

// Create a new booking
const createBooking = async (req, res) => {
    const { userId, slotId, vehicleType, timeFrom, timeTo, totalAmount } = req.body;
    const newBooking = await BookingModel.create({
        userId,
        slotId,
        vehicleType,
        timeFrom,
        timeTo,
        totalAmount,
    });
    console.log("new Booking:",newBooking);

    res.status(201).json(
      {
        statusCode:201,
        success: true,
        message:"new Booking:",
        newBooking:newBooking
      });
};



const updateBooking = async (req, res) => {
    const { _id } = req.params;  
    const updates = req.body;   
  
    console.log(`Received ID: ${_id}`);
    console.log(`Updates: ${JSON.stringify(updates)}`);
  
    
    const booking = await BookingModel.findById(_id);
    
    if (!booking) {
      return res.status(404).json({
        statusCode:404,
        success: false,
        message: 'Booking not found',
      });
    }
  
    
    const result = await BookingModel.updateOne({ _id}, updates);
    console.log(result);
  
    console.log(`Update result: ${JSON.stringify(result)}`);
  
    // Check if any document was modified
    if (result.modifiedCount > 0) {
      const updatedBooking = await BookingModel.findById(_id); 
      return res.status(200).json({
        statusCode:200,
        success: true,
        message: 'Booking updated successfully',
        booking: updatedBooking,
      });
    } else {
      return res.status(400).json({
        statusCode:400,
        success: false,
        message: 'Booking not found or no changes made',
      });
    }
  };



  const DeleteBookings = async (req, res) => {
    // console.log(req);
    const { _id } = req.params;  
    const deletes = req.body;   
    // console.log(deletes)
    console.log(`Received ID: ${_id}`);
    // console.log(`Deletes: ${JSON.stringify(deletes)}`);
  
    
    const booking = await BookingModel.findById(_id);
    
    if (!booking) {
      return res.status(404).json({
        statusCode:404,
        success: false,
        message: 'Booking not found',
      });
    }
  
    
    const result = await BookingModel.deleteOne({ _id}, deletes);
    console.log(result);
  
    console.log(`Delete result: ${JSON.stringify(result)}`);
    console.log(result.deletedCount)
    // Check if any document was modified
    if (result.deletedCount > 0) {
      const deletedBooking = await BookingModel.findById(_id); 
      console.log("delete",deletedBooking)
      return res.status(200).json({
        statusCode:200,
        success: true,
        message: 'Booking deleted successfully'
      });
    } else {
      return res.status(400).json({
        statusCode:400,
        success: false,
        message: 'Booking not found or no changes made',
      });
    }
  };


const Statistics=async (req, res) => {
  try {
      const year = req.params.year;
      const statsw = await getStats(year);
      const statsm= await getStats(year);

      res.status(200).json({
        statusCode:200,
        success:true,
        message:"Successfully get Statistics of weekly and Monthly",
        statsw:statsw.weeklyStats,
        statsm:statsm.monthlyStats,
      });
  } catch (error) {
      res.status(500).json(
        { 
          statusCode:500,
          success:false,
          message: 'Error retrieving stats', error 

        });
  }
};
//  
const getStats = async (year) => {
  // console.log("start")
  const startOfYear = new Date(`${year}-01-01`);
  const endOfYear = new Date(`${year}-12-31`);

  const weeklyStats = await BookingModel.aggregate([
      { 
          $match: { timeFrom: { $gte: startOfYear, $lte: endOfYear } } 
      },
      {
          $group: {
              _id: { $week: "$timeFrom" }, // Group by week
              totalBookings: { $sum: 1 },
              totalAmount: { $sum: "$totalAmount" },
          },
      },
      { $sort: { "_id": 1 } }
  ]);

  const monthlyStats = await BookingModel.aggregate([
      { 
          $match: { timeFrom: { $gte: startOfYear, $lte: endOfYear } } 
      },
      {
          $group: {
              _id: { $month: "$timeFrom" }, // Group by month
              totalBookings: { $sum: 1 },
              totalAmount: { $sum: "$totalAmount" },
          },
      },
      { $sort: { "_id": 1 } }
  ]);

  return { weeklyStats, monthlyStats };
}


module.exports = { getAllBookings,createBooking,updateBooking,DeleteBookings,Statistics };
