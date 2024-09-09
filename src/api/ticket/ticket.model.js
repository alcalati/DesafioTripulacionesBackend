import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  title: { type: String, required: true,},
  description: { type: String, required: true, },
  includes: { type: Array, required: true, },
  price: { type: Number, required: true,},
  type: { type: Array, required: true, },
});

const ticketModel = model('Ticket', ticketSchema, 'tickets');
export default ticketModel;
