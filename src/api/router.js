import Router from 'express';
// import buyRouter from './buy/buy.router.js';
import ticketRouter from './ticket/ticket.router.js';
import workshopRouter from './workshop/workshop.router.js';
import usersRouter from './users/users.router.js';
import myTicketRouter from './myTicket/myTicket.router.js';
import meetingsRouter from './meetings/meetings.router.js';
import awardsRouter from './awards/awards.router.js';
// import webinarRouter from './webinar/webinar.router.js';
import partnersRouter from './partners/partners.router.js';
import accommoationRouter from './accommodation/accommodation.router.js'

const router = Router();

// router.use('/buy', buyRouter);
router.use('/tickets', ticketRouter);
router.use('/workshops', workshopRouter);
router.use('/users', usersRouter);
router.use('/myTicket', myTicketRouter);
router.use('/meetings', meetingsRouter);
router.use('/awards', awardsRouter);
// router.use('/webinar', webinarRouter);
router.use('/partners', partnersRouter);
router.use('/accommodation', accommoationRouter);

export default router;
