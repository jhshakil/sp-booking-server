import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidations } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.createFacilityValidation),
  FacilityControllers.createFacility,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.updateFacilityValidation),
  FacilityControllers.updateFacility,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility,
);

router.get('/', FacilityControllers.getAllFacility);

export const FacilityRoutes = router;
