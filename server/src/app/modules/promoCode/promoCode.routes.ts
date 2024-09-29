import express from 'express';
import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';
import { PromoCodeController } from './promoCode.controller';

const router = express.Router();

// ! Get all List----------------------------------->>>
router.post('/create', auth(UserRoles.SUPERADMIN, UserRoles.ADMIN), PromoCodeController.createPromotion);
router.patch('/:promotionId', auth(UserRoles.SUPERADMIN, UserRoles.ADMIN), PromoCodeController.updatePromotion);
router.delete('/delete/:promotionId', auth(UserRoles.SUPERADMIN, UserRoles.ADMIN), PromoCodeController.deletePromotion);
router.get('/', auth(UserRoles.SUPERADMIN, UserRoles.ADMIN), PromoCodeController.getPromotions);

router.get('/check/:promoCode', PromoCodeController.isExist);

router.post(
  '/apply-promotion-code/:promoCode',
  // auth(UserRoles.USER),
  PromoCodeController.applyPromoCode
);

export const PromoCodeRoutes = router;
