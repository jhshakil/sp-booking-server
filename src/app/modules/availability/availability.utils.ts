import { TAvailableTime } from './availability.interface';

// Function to convert time string to minutes since midnight
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Function to convert minutes since midnight to time string
const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');
  const mins = (minutes % 60).toString().padStart(2, '0');
  return `${hours}:${mins}`;
};

// Find available slots given a list of booked slots
export const findAvailableSlots = (
  bookedSlots: TAvailableTime[],
  bookingStart: string = '00:00',
  bookingEnd: string = '23:59',
): TAvailableTime[] => {
  const availableSlots: TAvailableTime[] = [];
  const bookingStartMinutes = timeToMinutes(bookingStart);
  const bookingEndMinutes = timeToMinutes(bookingEnd);

  // Sort the booked slots by start time
  bookedSlots.sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
  );

  // Check for available slots before the first booked slot
  if (timeToMinutes(bookedSlots[0].startTime) > bookingStartMinutes) {
    availableSlots.push({
      startTime: bookingStart,
      endTime: bookedSlots[0].startTime,
    });
  }

  // Check for available slots between booked slots
  for (let i = 0; i < bookedSlots.length - 1; i++) {
    const endCurrentSlot = timeToMinutes(bookedSlots[i].endTime);
    const startNextSlot = timeToMinutes(bookedSlots[i + 1].startTime);
    if (endCurrentSlot < startNextSlot) {
      availableSlots.push({
        startTime: minutesToTime(endCurrentSlot),
        endTime: minutesToTime(startNextSlot),
      });
    }
  }

  // Check for available slots after the last booked slot
  if (
    timeToMinutes(bookedSlots[bookedSlots.length - 1].endTime) <
    bookingEndMinutes
  ) {
    availableSlots.push({
      startTime: bookedSlots[bookedSlots.length - 1].endTime,
      endTime: minutesToTime(bookingEndMinutes),
    });
  }

  return availableSlots;
};
