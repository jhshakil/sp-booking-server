import { Schema, model } from 'mongoose';
import { TFacility } from './facility.interface';

const facilitySchema = new Schema<TFacility>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String },
  isDeleted: { type: Boolean, default: false },
});

facilitySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
facilitySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

// Modify toJSON method to remove the password
facilitySchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const facility = this;
  const facilityObject = facility.toObject();

  delete facilityObject.__v;
  return facilityObject;
};

export const Facility = model<TFacility>('Facility', facilitySchema);
