import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.CreateBookingSchema),
  BookingControllers.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);
router.get(
  '/user/:email',
  auth(USER_ROLE.user),
  BookingControllers.getUserBookings,
);
router.delete('/:id', auth(USER_ROLE.user), BookingControllers.cancelBooking);
router.patch(
  '/confirm/:id',
  auth(USER_ROLE.admin),
  BookingControllers.confirmBooking,
);

router.post('/confirmation', BookingControllers.confirmPayment);

export const BookingRoutes = router;
