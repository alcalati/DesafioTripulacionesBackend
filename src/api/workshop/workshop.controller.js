import * as workshopService from './workshop.service.js';

export async function getAll(req, res) {
  try {
    const allWorkshops = await workshopService.getAll();
    res.json(allWorkshops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshops', error, });
  }
}
