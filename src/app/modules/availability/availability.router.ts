import { Router } from 'express';
import { AvailabilityControllers } from './availability.controller';

const router = Router();

router.get('/', AvailabilityControllers.checkAvailability);

export const AvailabilityRoutes = router;
