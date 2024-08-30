import { Router } from 'express';
import { AvailabilityControllers } from './availability.controller';

const router = Router();

router.post('/', AvailabilityControllers.checkAvailability);

export const AvailabilityRoutes = router;
