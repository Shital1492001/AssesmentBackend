const User = require ("../models/User")
const generateToken = require("../utils/generateJwt");

 const registerUser= async (req,res)=>{
  console.log(req.body)
    // res.send("data")
const email = await req.body.email;
const findUser = await User.findOne({email : email});
if(!findUser){
    const newUser = User.create(req.body)
    console.log(newUser)
    if (newUser) {
      // console.log("Registration Successfully...")
      res.status(201).json({
        statusCode:201,
        sucess:true,
        message:"User registered successfully.",
        _id: newUser._id,
       username: newUser.username,
       email: newUser.email
      
      });
    }else {
      console.log("Registration Failed....")
        res.status(400).json({
          statusCode:400,
          success: false,
          message: "User registration failed",
        });
      }
    }
else{
    res.status(400).json({
        statusCode:400,
        success: false,
        message: "User already exists",
      });
}
}
const loginUser= async (req,res)=>{
  const {email,password} = req.body
  console.log(req.body)
  const user = await User.findOne({email});

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
        statusCode: 200, // Adding the statusCode to the JSON response
        success: true,
        message: "Login successful.",
        _id: user._id,
        username: user.username,
        email: user.email,
        contactNumber: user.contactNumber,
        token: generateToken(user._id),
    });
  }
  else{
    res.status(400).json({
      statusCode:400,
      success: false,
      message: "Invalid Email Or Password....",
    });

  }
  
}


module.exports={registerUser,loginUser}