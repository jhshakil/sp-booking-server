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
router.get('/user', auth(USER_ROLE.user), BookingControllers.getSingleBooking);
router.delete('/:id', auth(USER_ROLE.user), BookingControllers.cancelBooking);

export const BookingRoutes = router;
