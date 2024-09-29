import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';
import { UserController } from './users.controller';

const router = express.Router();

// !  get all Users ------------------------------>>>
router.get('/', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), UserController.getAllUsersController);
// !  get client Users ------------------------------>>>
router.get('/get-clients', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), UserController.getAllClients);

// !  get My Profile ------------------------------>>>
router.get('/my-profile', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN, UserRoles.USER), UserController.getMyProfile);
// !  Update  User data ------------------------------>>>
router.patch(
  '/update-my-profile',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN, UserRoles.USER),
  validateRequest(UserValidation.updateMyProfile),
  UserController.updateMyProfileInfo
);

// !  get single user ------------------------------>>>
router.get('/get-single-user/:userId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), UserController.getSingleUser);

export const UserRoutes = router;
