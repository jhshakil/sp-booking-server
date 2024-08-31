import QueryBuilder from '../../builder/QueryBuilder';
import { facilitySearchableFields } from './facility.constant';
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

const getSingleFacilityFromDB = async (id: string) => {
  const result = await Facility.findById(id);
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

const getAllFacilityFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Facility.find(), query)
    .search(facilitySearchableFields)
    .filterLimit('pricePerHour')
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await productQuery.modelQuery;
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  getSingleFacilityFromDB,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
};
