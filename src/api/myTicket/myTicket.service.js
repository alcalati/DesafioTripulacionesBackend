import * as myTicketRepository from './myTicket.repository.js';
import QRCode from 'qrcode';
import qrcodeReader from 'qrcode-reader';
import Jimp from 'jimp'; // Para leer y procesar imágenes
import { Buffer } from 'buffer';
import User from '../users/users.model.js'; // Importamos el modelo de usuario

export async function purchaseTicket(userId, ticketId) {
  console.log(`Generating QR for TicketID: ${ticketId}, UserID: ${userId}`); // Log para verificar la generación del QR
  const qrData = `TicketID: ${ticketId}, UserID: ${userId}`;
  const qrCode = await QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H', width: 300 }); // Genera una imagen en formato Data URL
  console.log('QR Code generated:', qrCode); // Log del QR generado

  const myTicket = await myTicketRepository.createTicket(userId, ticketId, qrCode);
  console.log('Ticket stored in DB:', myTicket); // Log para verificar que se guardó en la DB
  return myTicket;
}

// Nueva función para obtener el email del usuario
export async function getUserEmail(userId) {
  const user = await User.findById(userId);
  return user.email;
}


export async function validateQR(qrCodeData) {
  console.log('Decoding QR Code'); // Log para iniciar el proceso de decodificación
  const decodedData = await decodeQRCode(qrCodeData); // Usamos una función para decodificar
  console.log('Decoded QR Data:', decodedData); // Log para mostrar los datos decodificados

  if (!decodedData) {
    throw new Error('Could not read the QR code');
  }

  // Buscar el ticket en la base de datos
  const { ticketId, userId, } = parseQRData(decodedData); // Función para extraer ticketId y userId
  console.log(`Searching for ticket in DB: TicketID: ${ticketId}, UserID: ${userId}`); // Log para verificar búsqueda
  const myTicket = await myTicketRepository.findTicketByIds(ticketId, userId);
  console.log('Ticket found:', myTicket); // Log para verificar si el ticket fue encontrado
  return !!myTicket; // Retornamos true si se encuentra un ticket válido
}

// Función para decodificar el QR
async function decodeQRCode(qrCodeData) {
  // Elimina la cabecera de la imagen en base64 si está presente
  console.log('Cleaning base64 data');
  const base64Data = qrCodeData.replace(/^data:image\/png;base64,/, '');

  try {
    const image = await Jimp.read(Buffer.from(base64Data, 'base64'));
    console.log('Image successfully read'); // Log para confirmar que la imagen fue leída
    return new Promise((resolve, reject) => {
      const qr = new qrcodeReader();
      qr.callback = (err, value) => {
        if (err) {
          console.error('Error decoding QR code:', err); // Log de error al decodificar
          return reject(err);
        }
        console.log('QR code decoded value:', value); // Log del valor decodificado
        resolve(value ? value.result : null);
      };
      qr.decode(image.bitmap);
    });
  } catch (error) {
    console.error('Error reading image:', error); // Log de error al leer la imagen
    throw new Error('Error processing QR code');
  }
}

// Función para extraer información del QR decodificado
function parseQRData(decodedData) {
  console.log('Parsing decoded data:', decodedData); // Log para verificar los datos decodificados
  const [ticketId, userId,] = decodedData.split(',').map(data => data.split(':')[1].trim());
  return { ticketId, userId, };
}
