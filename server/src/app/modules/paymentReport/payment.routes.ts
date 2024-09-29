import express, { NextFunction, Request, Response } from 'express';

import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import PaymentReportController from './payment.controllers';

const router = express.Router();

// Stripe payment request route
router.get('/', PaymentReportController.getPaymentReports);

router.get('/:paymentId', PaymentReportController.getPaymentReport);

export const PaymentReportRoutes = router;
