import express, { NextFunction, Request, Response } from 'express';

import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { ProductController } from './products.controller';
import { ProductZodValidation } from './products.validation';

const router = express.Router();

// ! Create New Product ------------------------------->>>

router.post('/', FileUploadHelper.uploadProductImage.array('files'), (req: Request, res: Response, next: NextFunction) => {
  req.body = ProductZodValidation.addProducts.parse(JSON.parse(req.body.data));
  return ProductController.addProductsController(req, res, next);
});
// ! add more variant on product

router.post(
  '/add-more-variants/:productId',
  FileUploadHelper.uploadProductImage.array('files'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductZodValidation.addMoreVariants.parse(JSON.parse(req.body.data));
    return ProductController.addMoreVariants(req, res, next);
  }
);

// ! Get all Product----------------------------------->>>
router.get('/', ProductController.getProductsController);

router.get('/variant', ProductController.getAllVariant);

router.get('/:productId', ProductController.getSingleProduct);

router.patch(
  '/:productId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadProductImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductZodValidation.editProduct.parse(JSON.parse(req.body.data));
    return ProductController.updateProduct(req, res, next);
  }
);

router.patch(
  '/variant/:variantId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadProductImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductZodValidation.editProductVariation.parse(JSON.parse(req.body.data));
    return ProductController.updateProductVariation(req, res, next);
  }
);

router.delete('/:productId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), ProductController.deleteProduct);
router.delete('/variant/:variantId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), ProductController.deleteProductVariant);

export const ProductRoutes = router;
