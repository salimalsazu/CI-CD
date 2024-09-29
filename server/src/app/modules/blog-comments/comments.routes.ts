import express from 'express';
import { CommentController } from './comments.controller';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { BlogCommentValidation } from './comments.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// ! Create New comment ------------------------------->>>

router.post('/:blogHref', validateRequest(BlogCommentValidation.addCommentOnBlog), CommentController.addComment);

// ! Get all Comments by blog---------------------------------->>>
router.get('/get-all-comments', CommentController.getAllComments);
// ! Get all Comments by blog---------------------------------->>>
router.get('/from-blog/:blogHref', CommentController.getSingleComment);

//  ! delete comment by id

router.delete('/:commentId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), CommentController.deleteComment);

export const CommentRoutes = router;
