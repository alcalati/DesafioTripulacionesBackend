import { Schema, model } from 'mongoose';

const accommodationSchema = new Schema({
  name: { type: String, required: true,},
  neighborhood: { type: String, required: true, },
  price: { type: Number, required: true,},
  discount: { type: Number, required: true,},
  image: { type: Array, required: false, },
});

const accommodationModel = model('Accomodation', accommodationSchema, 'accommodation');
export default accommodationModel;
