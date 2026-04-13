import { Request, Response } from 'express';
import { LikeService } from '../services/like.service';
import { catchAsync } from '../utils/catchAsync';
import { validateUser } from '../utils/validate.user';

export class LikeController {

    constructor(private likeService: LikeService) { }

    // TOGGLE LIKE CONTROLLER
    toggleLikeController = catchAsync(async (req: Request, res: Response) => {
        const userId = validateUser(req);
        const noteId = req.params.noteId as string;
        const result = await this.likeService.toggleLikeService(userId, noteId);
        res.status(200).json({
            status: 'success',
            data: result
        });
    });

    // GET LIKE COUNT CONTROLLER
    getLikeCountController = catchAsync(async (req: Request, res: Response) => {
        const noteId = req.params.noteId as string;
        const result = await this.likeService.getLikeCountService(noteId);
        res.status(200).json({
            status: 'success',
            data: result
        });
    });

    // GET USER LIKED NOTES CONTROLLER
    getUserLikedNotesController = catchAsync(async (req: Request, res: Response) => {
        const userId = validateUser(req);
        const notes = await this.likeService.getUserLikedNotesService(userId);
        res.status(200).json({
            status: 'success',
            data: notes
        });
    });

    // CHECK IS LIKED CONTROLLER
    checkIsLikedController = catchAsync(async (req: Request, res: Response) => {
        const userId = validateUser(req);
        const noteId = req.params.noteId as string;
        const result = await this.likeService.checkIsLikedService(userId, noteId);
        res.status(200).json({
            status: 'success',
            data: result
        });
    });
}