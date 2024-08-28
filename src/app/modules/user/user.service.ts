import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

const getUserIntoDB = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const UserServices = {
  createUserIntoDB,
  getUserIntoDB,
};
