const Slot = require('../models/Slot');


const createSlot = async (req, res) => {
  const { status, ratePerHour, vehicleType} = req.body;
  const newSlot = await Slot.create({
      status,
      ratePerHour,
      vehicleType,
  });
  console.log("new Slot:",newSlot);

  res.status(201).json(
    {
      statusCode:201,
      success: true,
      message:"new newSlot:",
      newSlot:newSlot
    });
};



const getAllSlots = async (req, res) => {
    try {
        // Fetch all slots from the database
        const slots = await Slot.find({});

        if (!slots || slots.length === 0) {
            return res.status(404).json({ 
              statuCode:404,
              success :false,
              message: 'No slots available' 
            });
        }

        
        res.status(200).json(
          {
            statusCode:200,
            success:true,
            message:"Fetching All Slots From Database..",
            slot:slots
        });
    } catch (error) {
       
        console.error(`Error fetching slots: ${error.message}`);
        res.status(500).json(
          { 
            statusCode:500,
            success: false,
            message: 'Server error' 
          });
    }
};

  // Search slots by vehicle type
const searchSlots = async (req, res) => {
    const { vehicleType } = req.params; 
  
    
    const regexPattern = new RegExp(vehicleType, 'i');
  
    const slots = await Slot.find({ vehicleType: { $regex: regexPattern } }).exec();   ///.exec() returns a promise, which allows you to handle the result using .then() or await
    //.exec() is not mandatory but useful for clarity and to guarantee you're working with a promise when executing Mongoose queries.
  
    if (!slots || slots.length === 0) {
      return res.status(404).json(
        { 
          statusCode:404,
          success: false,
          message: 'No slots found matching the vehicle type' 
        });
    }
  
    
    res.status(200).json(
      {
        statusCode:200,
        success:true,
        message:"Slot Found Matching the vehicle type.....",
        slot:slots
      });
};


  // const getSingleSlot = asyncHandler(async (req, res) => {
  //   const { vehicleType } = req.params; 
  
    
  //   const regexPattern = new RegExp(vehicleType, 'i');
  
    
  //   const slot = await Slot.findOne({ vehicleType: { $regex: regexPattern } }).exec();
  
  //   if (!slot) {
  //     return res.status(404).json({ message: 'Slot not found for the specified vehicle type' });
  //   }
  
    
  //   res.status(200).json(slot);
  // });
  

  // async function updateSlot(slotId){
  //   const filter = {_id: slotId};
  //   const update = { $set: {isAvailable: false}}
  //   return await slotModel.updateOne(filter, update)
  
  // }
  const updateSlot = async (req, res) => {
    const { _id } = req.params;  
    const updates = {$set:{status:"occupied"}};   
  
    console.log(`Received ID: ${_id}`);
    console.log(`Updates: ${JSON.stringify(updates)}`);
  
    // // Check if the slot exists
    const slot = await Slot.findById(_id);
    
    if (!slot) {
      return res.status(404).json({
        statusCode:404,
        success: false,
        message: 'Slot not found',
      });
    }
  
    
    const result = await Slot.updateOne({ _id}, updates);
  
    console.log(`Update result: ${JSON.stringify(result)}`);
  
  
    if (result.modifiedCount > 0) {
      
      const updatedSlot = await Slot.findById(_id); // Fetch the updated document
      console.log("updated Slot",updatedSlot)
      return res.status(200).json({
        statusCode:200,
        success: true,
        message: 'Slot updated successfully',
        slot: updatedSlot,
      });
    } else {
      return res.status(400).json({
        statusCode:400,
        success: false,
        message: 'Slot not found or no changes made',
        slot:[]
      });
    }
  };
  
  module.exports={
    
    createSlot,
    getAllSlots,
    searchSlots,
    // getSingleSlot,
    updateSlot
     
    }