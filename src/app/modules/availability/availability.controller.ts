import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AvailabilityServices } from './availability.service';

const checkAvailability = catchAsync(async (req, res) => {
  let date = req.query.date;

  if (!date) {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    date =
      `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}` as string;
  }

  const result = await AvailabilityServices.checkingAvailability(
    date as string,
  );

  sendResponse(res, {
    message: 'Availability checked successfully',
    data: result,
  });
});

export const AvailabilityControllers = {
  checkAvailability,
};
