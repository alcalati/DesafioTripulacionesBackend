import workshopModel from './workshop.model.js';

async function getAll() {
  return await workshopModel.find({}).lean();
}

async function getByDay(day) {
  // Filtramos por el número de día (1 o 2)
  return await workshopModel.find({ day, }).lean();
}

export default { getAll, getByDay, };
