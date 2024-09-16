import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true,},
  description: { type: String, required: true, },
  charge: { type: String, required: true, },
});

const partnerModel = mongoose.model('Partner', partnerSchema, 'partner');
export default partnerModel;
