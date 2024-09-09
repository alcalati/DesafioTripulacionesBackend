import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema({
  date: { type: Date, required: true, },
  type: { type: String, required: true, },
  title: { type: String, required: true, },
  duration: { type: Number, required: true, },
});

const workshopModel = mongoose.model('Workshop', workshopSchema);

export default workshopModel;
