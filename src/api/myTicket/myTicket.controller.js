import * as myTicketService from './myTicket.service.js';

// Controlador para comprar una entrada
export async function purchaseTicket(req, res) {
  const { userId, ticketId } = req.body; // Recibimos el id del usuario y el ticket
  console.log(`Purchase Ticket - UserID: ${userId}, TicketID: ${ticketId}`); // Log para verificar los datos recibidos
  try {
    const myTicket = await myTicketService.purchaseTicket(userId, ticketId);
    console.log('Ticket purchased successfully:', myTicket); // Log para verificar si la compra se realizó
    res.json(myTicket);
  } catch (error) {
    console.error('Error purchasing ticket:', error); // Log de error
    res.status(500).json({ message: 'Error purchasing ticket', error, });
  }
}

// Controlador para validar un QR
export async function validateQR(req, res) {
  const { qrCodeData } = req.body; // Recibimos la imagen o data del QR desde el frontend
  console.log('Validating QR Code:', qrCodeData); // Log para verificar los datos del QR
  try {
    const isValid = await myTicketService.validateQR(qrCodeData);
    console.log('QR Code valid:', isValid); // Log para ver si es válido o no
    if (isValid) {
      res.json({ message: 'Ticket validated successfully', });
    } else {
      res.status(400).json({ message: 'Invalid or unrecognized QR code', });
    }
  } catch (error) {
    console.error('Error validating QR code:', error); // Log de error
    res.status(500).json({ message: 'Error validating QR code', error, });
  }
}
