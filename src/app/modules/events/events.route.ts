
import { Router } from 'express';
import { eventsController } from './events.controller';

const router = Router();

router.post('/', eventsController.createEvents);
router.patch('/:id', eventsController.updateEvents);
router.delete('/:id', eventsController.deleteEvents);
router.get('/:id', eventsController.getEventsById);
router.get('/', eventsController.getAllEvents);

export const eventsRoutes = router;