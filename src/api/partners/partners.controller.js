import * as partnerService from './partners.service.js';

// Controlador para obtener todos los partners
export async function getAllPartners(req, res) {
  try {
    const partners = await partnerService.getAllPartners();
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving partners', error, });
  }
}
