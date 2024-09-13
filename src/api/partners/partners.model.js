import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  description: { type: String, required: true, },
  logo: { type: String, required: true, }, // URL de la imagen
});

const partnerModel = mongoose.model('Partner', partnerSchema, 'partner');
export default partnerModel;
