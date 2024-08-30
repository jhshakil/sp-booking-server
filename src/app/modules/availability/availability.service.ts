import { Booking } from '../booking/booking.model';
import { findAvailableSlots } from './availability.utils';

const checkingAvailability = async (date: string, facility: string) => {
  const bookings = await Booking.find({
    date,
    facility,
  }).select('startTime endTime');
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
