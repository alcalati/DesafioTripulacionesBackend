import partnerModel from './partners.model.js';

// Servicio para obtener todos los partners
export async function getAllPartners() {
  return await partnerModel.find(); // Devuelve todos los partners
}
