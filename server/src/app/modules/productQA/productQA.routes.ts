import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { QAValidation } from './productQA.validations';
import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';
import { QAController } from './productQA.controller';

const router = express.Router();

// ! Create New List ------------------------------->>>
router.post('/', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), validateRequest(QAValidation.addQA), QAController.addQAController);

// ! Get all List----------------------------------->>>
router.get('/', QAController.getQAController);

router.patch('/:productQaId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), QAController.updateQA);

router.delete('/:productQaId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), QAController.deleteQA);

export const QARoutes = router;
