import express from 'express';

import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

// ! Create New Order ------------------------------->>>
router.post('/create-order', OrderController.createOrder);

router.get('/', OrderController.getAllOrders);

router.get('/monthWise', OrderController.monthWiseOrder);

router.patch('/:orderId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), OrderController.updateOrder);

router.delete('/:orderId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), OrderController.deleteOrder);

//export Route
export const OrderRoutes = router;
