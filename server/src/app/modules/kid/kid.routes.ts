import { KidValidation } from './kid.validation';
import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { KidController } from './kid.controller';

const router = express.Router();

// ! Create New kid ------------------------------->>>

router.post('/', FileUploadHelper.uploadProductImage.single('file'), (req: Request, res: Response, next: NextFunction) => {
  req.body = KidValidation.addKid.parse(JSON.parse(req.body.data));
  return KidController.addKid(req, res, next);
});

// ! Get all kids----------------------------------->>>
router.get('/get-all-kids', KidController.getKid);

router.get('/my-kids', auth(UserRoles.USER), KidController.getMyAllKids);

// ! Update  kid Info ------------------------------->>>

router.patch(
  '/update/:kidId',
  auth(UserRoles.USER),
  FileUploadHelper.uploadProductImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = KidValidation.updateKid.parse(JSON.parse(req.body.data));
    return KidController.updateKid(req, res, next);
  }
);

//delete Kid
router.delete('/delete/:kidId', auth(UserRoles.USER), KidController.deleteKid);

export const KidRoutes = router;
