import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true, },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true, },
  start: { type: Date, required: true, },
  end: { type: Date, required: true, },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled',], default: 'scheduled', },
});

const meetingModel = mongoose.model('Meeting', meetingSchema);
export default meetingModel;
