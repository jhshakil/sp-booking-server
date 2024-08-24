import { z } from 'zod';

const createFacilityValidation = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    location: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateFacilityValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    location: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const FacilityValidations = {
  createFacilityValidation,
  updateFacilityValidation,
};
