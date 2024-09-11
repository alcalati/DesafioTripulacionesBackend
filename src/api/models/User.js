import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String },
  charge: { type: String },
  role: { type: String },
  linkedin: { type: String },
  allergies: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;
