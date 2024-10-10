const express = require('express');
const bodyParser = require("body-parser")
const dbConnect = require("./config/mongodb")
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/userRoutes");
const slotRouter= require("./routes/slotRoutes");
const bookingRouter = require("./routes/bookingRoutes")
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');
dbConnect.config;


app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`)
})




// app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())            //Parses incoming requests with JSON payloads.
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use("/user",authRouter)
app.use("/slot",slotRouter)
app.use("/booking",bookingRouter)


app.get("/",(req,res)=>{
  res.send("server has started running successfully")
})
app.use(notFound);
app.use(errorHandler)