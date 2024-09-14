import partnerModel from './partners.model.js';

async function getAll() {
  return await partnerModel.find({}).lean();
}

export default { getAll,};

