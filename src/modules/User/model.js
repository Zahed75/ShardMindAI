const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Schema= new mongoose.Schema({
  username:{
    type:String,
    required:[true,'Username Must Be Required'],
    max:[30,'Please Input Your UserName'],
    unique:[true,'UserName Must Be Unique/Used Already']
  },
  email: {
    type: String,
    unique: [true, 'your email must be unique/used already'],
    required: [true, 'email must be required'],
  },
  password: {
    type: String,
    max: [6, 'Your Password must be in 6 digits'],
    
  },
  otp: {
    type: Number,
  },
  emailChangeOTP: {
    type: Number,
  },
  changedEmail: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: [String],

},{ timestamps: true }
)