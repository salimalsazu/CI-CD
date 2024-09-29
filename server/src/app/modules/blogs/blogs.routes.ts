import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { BlogsController } from './blogs.controller';
import { BlogsValidation } from './blogs.validation';

const router = express.Router();

// ! Create New Blog ------------------------------->>>

router.post(
  '/',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadBlogImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = BlogsValidation.addNewBlog.parse(JSON.parse(req.body.data));
    return BlogsController.AddNewBlog(req, res, next);
  }
);

// ! Get all Blog----------------------------------->>>
router.get('/all-blogs', BlogsController.getAllBlogs);
router.get('/get-single-by-href/:blogHref', BlogsController.getSingleBlogByHref);
// for dashboard
router.get('/get-single-by-id/:blogId', BlogsController.getSingleBlogById);
// ! update blog
router.patch(
  '/:blogId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadBlogImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = BlogsValidation.updateBlog.parse(JSON.parse(req.body.data));
    return BlogsController.updateBlog(req, res, next);
  }
);

router.delete('/:blogId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), BlogsController.deleteBlog);

export const BlogsRoutes = router;
