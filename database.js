import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const { MONGO_URL, MONGO_DB_NAME } = process.env;

(async () => {
  try {
    await mongoose.connect(MONGO_URL, { dbName: MONGO_DB_NAME, autoIndex: true });
    console.log('Database connection successful');
  } catch (err) {
    console.error('Error connecting to the database');
    console.error(err);
  }
})();
