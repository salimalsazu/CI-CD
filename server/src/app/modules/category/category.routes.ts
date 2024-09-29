import express, { NextFunction, Request, Response } from 'express';
import { CategoryController } from './category.controller';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { CategoryValidation } from './category.validation';

const router = express.Router();

// ! Create New List ------------------------------->>>

router.post(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadCategoryImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CategoryValidation.addCategory.parse(JSON.parse(req.body.data));
    return CategoryController.addCategoryController(req, res, next);
  }
);

// ! Get all List----------------------------------->>>
router.get(
  '/',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  CategoryController.getCategoryController
);

router.get(
  '/:categoryHref',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  CategoryController.getSingleCategory
);

router.patch(
  '/:categoryId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadCategoryImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CategoryValidation.editCategory.parse(JSON.parse(req.body.data));

    // JSON.parse(req.body.data);
    return CategoryController.updateCategory(req, res, next);
  }
);

router.delete(
  '/:categoryId',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
