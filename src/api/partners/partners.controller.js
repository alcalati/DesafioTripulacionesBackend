import * as partnerService from './partners.service.js';

export async function getAll(req, res) {
  try {
    const allPartners = await partnerService.getAll();
    res.json(allPartners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching partners', error, });
  }
}

