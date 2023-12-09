const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
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
  role: {
    type: String,
    //  SH -> SHARD_MIND
    //DL -> DEMO_LAB
    
    enum: ['SH','DL'],
    require: [true, 'Role must be selected'],
  },
  refreshToken: [String],

},{ timestamps: true }
)


// Password Hash Function using Bycryptjs

UserSchema.pre('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods = {
  async authenticate(password) {
    return await bcrypt.compare(password, this.password);
  },
};


const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;