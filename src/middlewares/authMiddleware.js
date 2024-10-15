const jwt = require("jsonwebtoken")
const User = require("../models/User")

const authorizedToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if(req.user){
        next();
      }
      else{
        console.log("User Not Found......!");
      }
      
    } catch (error) {
      console.log("Token Verification Error....!");
      res.status(401).json(
        {
          statusCode:401,
          message:"Not authorized, token failed"
        }
      );
    }
  }

  if (!token) {
    res.status(401).json({
      statusCode:401,
      message:"Not authorized, no token"
    });
  }
};

module.exports = { authorizedToken };