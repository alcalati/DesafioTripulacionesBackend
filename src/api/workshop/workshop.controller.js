import * as workshopService from './workshop.service.js';

export async function getAll(req, res) {
  try {
    const allWorkshops = await workshopService.getAll();
    res.json(allWorkshops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshops', error, });
  }
}

export async function getByDay(req, res) {
  const { day, } = req.query; // Se espera que sea '1' o '2'
  try {
    const workshops = await workshopService.getByDay(Number(day)); // Convertimos el parámetro a número
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshops by day', error, });
  }
}

