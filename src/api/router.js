import Router from 'express';
// import buyRouter from './buy/buy.router.js';
import ticketRouter from './ticket/ticket.router.js';
import workshopRouter from './workshop/workshop.router.js';

const router = Router();

// router.use('/buy', buyRouter);
router.use('/tickets', ticketRouter);
router.use('/workshops', workshopRouter);

export default router;
