import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema({
  day: { type: Number, required: true, }, // El campo `day` es un número (1 o 2)
  type: { type: String, required: true, },
  title: { type: String, required: true, },
  duration: { type: Number, required: true, },
});

const workshopModel = mongoose.model('Workshop', workshopSchema);

export default workshopModel;
