import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    message: 'User registered successfully',
    data: '',
  });
});
const getUser = catchAsync(async (req, res) => {
  const result = await UserServices.getUserIntoDB(req.params.email);

  sendResponse(res, {
    message: 'Get user successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getUser,
};
