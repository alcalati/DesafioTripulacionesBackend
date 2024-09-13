import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  name: String,
  lastName: String,
  company: String,
  charge: String,
  role: String,
  linkedin: String,
  allergies: String,
  confirmed: { type: Boolean, default: false },
  confirmationToken: String,
  confirmationTokenExpires: Date,
});

const User = mongoose.model('User', userSchema);
export default User;
