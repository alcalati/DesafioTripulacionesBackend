import mongoose from 'mongoose';

const myTicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true, },
  qrCode: { type: String, required: true, }, // Aquí se almacena la imagen del código QR
  purchaseDate: { type: Date, default: Date.now, }, // Fecha de compra
});

const myTicketModel = mongoose.model('myTicket', myTicketSchema, 'myTicket');

export default myTicketModel;
