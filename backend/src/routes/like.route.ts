import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LikeService } from '../services/like.service';
import { LikeController } from '../controllers/like.controller';

const likeRouter = Router();

const likeService = new LikeService();
const likeController = new LikeController(likeService);

// LIKE ROUTES
likeRouter.post('/:noteId/toggle', authMiddleware, likeController.toggleLikeController);
likeRouter.get('/:noteId/count', likeController.getLikeCountController);
likeRouter.get('/user/liked-notes', authMiddleware, likeController.getUserLikedNotesController);
likeRouter.get('/:noteId/is-liked', authMiddleware, likeController.checkIsLikedController);

export default likeRouter;