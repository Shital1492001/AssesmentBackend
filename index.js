const express = require('express');
const bodyParser = require("body-parser")
const dbConnect = require("./src/config/mongodb")
const app = express();
const authRouter = require("./src/routes/userRoutes");
const slotRouter= require("./src/routes/slotRoutes");
const bookingRouter = require("./src/routes/bookingRoutes");
const cors = require('cors');
dbConnect.config;
require("dotenv").config();


app.use(bodyParser.json())            //Parses incoming requests and make available as an object for use.
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))      //
app.use("/user",authRouter)
app.use("/slot",slotRouter)
app.use("/booking",bookingRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`)
})

app.get("/",(req,res)=>{
  res.send("server has started running successfully")
})
