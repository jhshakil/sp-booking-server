import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityServices } from './facility.service';

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);

  sendResponse(res, {
    message: 'Facility added successfully',
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.updateFacilityFromDB(
    req.params.id,
    req.body,
  );

  result
    ? sendResponse(res, {
        message: 'Facility updated successfully',
        data: result,
      })
    : sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Facility updated failed',
        data: result,
      });
});

const getSingleFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.getSingleFacilityFromDB(req.params.id);

  sendResponse(res, {
    message: 'Facility retrieved successfully',
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.deleteFacilityFromDB(req.params.id);

  sendResponse(res, {
    message: 'Facility deleted successfully',
    data: result,
  });
});

const getAllFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilityFromDB(req.query);

  sendResponse(res, {
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  getSingleFacility,
  deleteFacility,
  getAllFacility,
};
