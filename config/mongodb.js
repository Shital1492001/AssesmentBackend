const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://shitalavhad29:vWrEZSP32kzqfUNJ@cluster0.rubpaxn.mongodb.net/parkingSlot?retryWrites=true&w=majority&appName=Cluster0")
.then((success)=>{console.log("Database connected successfully......")
    // require("../models/User"); // what schema and models we are using
})
.catch(err=>console.log(err))