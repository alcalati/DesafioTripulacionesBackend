import express from 'express';
import './database.js';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors({ origin: true, }));

// eslint-disable-next-line no-undef
const { PORT, } = process.env;
const port = PORT || 3000;
server.listen(port, () => {
  console.log(`+Project has been started at port ${port}`);
});