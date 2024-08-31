import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(
    req.body,
    req.user.email,
  );

  sendResponse(res, {
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getUserBookingsFromDB(req.params.email);

  sendResponse(res, {
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.cancelBookingIntoDB(req.params.id);

  sendResponse(res, {
    message: 'Bookings cancelled successfully',
    data: result,
  });
});
const confirmBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.confirmBookingIntoDB(req.params.id);

  sendResponse(res, {
    message: 'Bookings confirm successfully',
    data: result,
  });
});

const confirmPayment = catchAsync(async (req, res) => {
  const { transactionId } = req.query;
  const result = await BookingServices.confirmationService(
    transactionId as string,
  );

  res.send(result);
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  cancelBooking,
  confirmBooking,
  confirmPayment,
};
