import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Facility } from '../facility/facility.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { hasTimeConflict } from './booking.utils';

const createBookingIntoDB = async (payload: TBooking, user: string) => {
  const { date, startTime, endTime } = payload;

  const mainData = payload;
  const userData = await User.findOne({ email: user });

  if (!userData) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  mainData.user = userData.id;

  const id = payload.facility;
  const facility = await Facility.findById(id);

  if (!facility)
    throw new AppError(httpStatus.NOT_FOUND, 'This facility is not found!');

  const payableAmount =
    ((new Date(`1970-01-01T${payload.endTime}:00`).getTime() / 1000 -
      new Date(`1970-01-01T${payload.startTime}:00`).getTime() / 1000) /
      3600) *
    facility.pricePerHour;

  mainData.payableAmount = payableAmount;

  // get the schedules of the bookings
  const assignedSchedules = await Booking.find({ date }).select(
    'date startTime endTime',
  );

  const newSchedule = {
    date,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule))
    throw new AppError(
      httpStatus.CONFLICT,
      'This booking slot is not available at that time ! Choose other time or day',
    );

  const result = await Booking.create(mainData);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('user').populate('facility');

  return result;
};

const getSingleBookingFromDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const result = await Booking.find({ user: user.id }).populate('facility');
  return result;
};

const cancelBookingIntoDB = async (id: string) => {
  const result = await Booking.findOneAndUpdate(
    { _id: id },
    { isBooked: 'canceled' },
    { new: true },
  );

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  cancelBookingIntoDB,
};
