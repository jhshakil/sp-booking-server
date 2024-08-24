import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);

  return result;
};

const updateFacilityFromDB = async (id: string, payload: TFacility) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const getAllFacilityFromDB = async () => {
  const result = await Facility.find({ isDeleted: { $ne: true } });
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
};
