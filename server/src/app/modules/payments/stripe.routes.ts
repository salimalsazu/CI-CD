import express from 'express';

import StripeController from './stripe.controllers';

const router = express.Router();

// Stripe payment request route
router.post('/create-payment-intent', StripeController.createPaymentIntent);
router.post('/update-payment-intent', StripeController.updatePaymentIntent);

router.post('/retrieve-payment-info', StripeController.retrieveStripePaymentInformation);

export const StripeRoutes = router;
