import Router from 'express';
// import buyRouter from './buy/buy.router.js';
import ticketRouter from './ticket/ticket.router.js';

const router = Router();

// router.use('/buy', buyRouter);
router.use('/tickets', ticketRouter);

export default router;
