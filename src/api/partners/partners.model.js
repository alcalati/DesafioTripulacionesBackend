import { Schema, model } from 'mongoose';

const partnerSchema = new Schema({
  name: { type: String, required: true,},
  description: { type: String, required: true, },
  charge: { type: String, required: true, },
});

const partnerModel = model('Partner', partnerSchema, 'partners');
export default partnerModel;
