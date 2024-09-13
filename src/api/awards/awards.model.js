import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema({
  ideaTitle: { type: String, required: true, },
  description: { type: String, required: true, },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
  paymentStatus: { type: String, enum: ['pending', 'completed',], default: 'pending', },
  submissionDate: { type: Date, default: Date.now, },
  status: { type: String, enum: ['submitted', 'evaluating', 'approved', 'rejected',], default: 'submitted', },
  jury: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', },], // Jurado seleccionado
  prize: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: false, }, // Empresa colaboradora platinum
});

const awardModel = mongoose.model('Award', awardSchema);

export default awardModel;
