import express from 'express';

import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/create-user', validateRequest(AuthValidation.createUser), AuthController.createNewUser);

router.post('/login', AuthController.userLogin);
router.post('/dashboard-login', AuthController.dashboardLogin);

router.post('/refresh-token', AuthController.refreshToken);

router.post('/forget-password', AuthController.forgetPassword);

export const AuthRoutes = router;
