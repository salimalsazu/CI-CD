import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { TaxValidation } from './tax.validations';
import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';
import { TaxController } from './taxcontroller';

const router = express.Router();

// ! Create New List ------------------------------->>>
router.post('/', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), validateRequest(TaxValidation.addTax), TaxController.addTax);

// ! Get all List----------------------------------->>>
router.get('/', TaxController.getTax);

router.patch('/:taxId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), TaxController.updateTax);

router.delete('/:taxId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), TaxController.deleteTax);

//export Route
export const TaxRoutes = router;
