import * as accommodationService from './accommodation.service.js';

export async function getAll(req, res) {
  try {
    const allAccommodation = await accommodationService.getAll();
    res.json(allAccommodation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accommodation', error, });
  }
}