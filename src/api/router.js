import Router from 'express';
// import buyRouter from './buy/buy.router.js';
import ticketRouter from './ticket/ticket.router.js';
import workshopRouter from './workshop/workshop.router.js';
import usersRouter from './users/users.router.js';
import myTicketRouter from './myTicket/myTicket.router.js';

const router = Router();

// router.use('/buy', buyRouter);
router.use('/tickets', ticketRouter);
router.use('/workshops', workshopRouter);
router.use('/users', usersRouter);
router.use('/myTicket', myTicketRouter);

export default router;
