import Router from 'express';
import { protect } from '../../middlewares/authMiddleware.js'; // Incluye la extensión .js
import ticketRouter from './ticket/ticket.router.js';
import workshopRouter from './workshop/workshop.router.js';
import usersRouter from './users/users.router.js';
import myTicketRouter from './myTicket/myTicket.router.js';
import meetingsRouter from './meetings/meetings.router.js';
import awardsRouter from './awards/awards.router.js';
import partnersRouter from './partners/partners.router.js';
import accommoationRouter from './accommodation/accommodation.router.js'

const router = Router();

// Protege todas las rutas bajo /users
router.use('/users', protect, usersRouter);

// Otras rutas no protegidas
router.use('/tickets', ticketRouter);
router.use('/workshops', workshopRouter);
router.use('/myTicket', myTicketRouter);
router.use('/meetings', meetingsRouter);
router.use('/awards', awardsRouter);
router.use('/partners', partnersRouter);
router.use('/accommodation', accommoationRouter);

export default router;
