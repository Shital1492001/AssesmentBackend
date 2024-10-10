const mongoose = require('mongoose');
const bcrypt = require("bcryptjs") 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: Number },
  password: { type: String, required: true },
  // profileImage: { data:Buffer,contentType:String }, 
},
{
  timestamps:true
});


userSchema.pre("save", async function(next){
  if(!this.modifiedPaths("password")){
      next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('User', userSchema);
