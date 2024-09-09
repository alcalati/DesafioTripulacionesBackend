import workshopModel from './workshop.model.js';

async function getAll() {
  const allWorkshops = await workshopModel.find({}).lean();
  return allWorkshops;
}

export default { getAll, };
