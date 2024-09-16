import accommodationModel from './accommodation.model.js';

async function getAll() {
  return await accommodationModel.find({}).lean();
}

export default { getAll,};