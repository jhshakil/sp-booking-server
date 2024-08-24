import { Booking } from '../booking/booking.model';
import { findAvailableSlots } from './availability.utils';

const checkingAvailability = async (date: string) => {
  const bookings = await Booking.find({ date }).select('startTime endTime');
  let result;
  if (bookings && bookings.length) {
    result = findAvailableSlots(bookings);
  } else {
    result = [
      {
        startTime: '00:00',
        endTime: '23:59',
      },
    ];
  }
  return result;
};

export const AvailabilityServices = {
  checkingAvailability,
};
