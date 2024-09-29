import express, { NextFunction, Request, Response } from 'express';
import { TestimonialController } from './testimonial.controller';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { TestimonialValidation } from './testimonial.validation';

const router = express.Router();

// ! Create New List ------------------------------->>>

router.post(
  '/',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadTestimonialImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TestimonialValidation.addTestimonial.parse(JSON.parse(req.body.data));
    return TestimonialController.addTestimonial(req, res, next);
  }
);

// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  TestimonialController.getTestimonial
);

router.patch(
  '/:testimonialId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadTestimonialImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TestimonialValidation.editTestimonial.parse(JSON.parse(req.body.data));

    // JSON.parse(req.body.data);
    return TestimonialController.updateTestimonial(req, res, next);
  }
);

router.delete(
  '/:testimonialId',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  TestimonialController.deleteTestimonial
);

export const TestimonialRoutes = router;
