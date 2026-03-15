import { Request, Response } from 'express';
import { NoteService } from '../services/note.service';
import { catchAsync } from '../utils/catchAsync';
import { validateUser } from '../utils/validate.user';

export class NoteController {

    constructor(private noteService: NoteService) { }

    // CREATE NOTE CONTROLLER
    createNoteController = catchAsync(async (req: Request, res: Response) => {
        const userId = validateUser(req);
        const { title, content, isPublic } = req.body;
        const newNote = await this.noteService.createNoteService(userId, {
            title,
            content,
            isPublic: isPublic ?? true
        });
        res.status(201).json({
            status: 'success',
            data: newNote
        });
    });

    // GET ALL NOTES CONTROLLER
    getAllNotesController = catchAsync(async (req: Request, res: Response) => {
        const userId = validateUser(req);
        const notes = await this.noteService.getAllNotesService(userId);
        res.status(200).json({
            status: 'success',
            data: notes
        });
    });

    // DELETE NOTE CONTROLLER
    deleteNoteController = catchAsync(async (req: Request, res: Response) => {
        const userId = validateUser(req);
        const noteId = req.params.id as string;
        await this.noteService.deleteNoteService(noteId, userId);
        res.status(200).json({
            status: 'success',
            message: 'Note deleted successfully.'
        });
    });

    // UPDATE NOTE CONTROLLER
    updateNoteController = catchAsync(async (req: Request, res: Response) => {
        const userId = validateUser(req);
        const noteId = req.params.id as string;
        const { title, content, isPublic } = req.body;
        const updatedNote = await this.noteService.updateNoteService(noteId, userId, {
            title,
            content,
            isPublic: isPublic ?? true
        });
        res.status(200).json({
            status: 'success',
            data: updatedNote
        });
    });
    // GET PAGINATED NOTES CONTROLLER
    getPaginatedNotesController = catchAsync(async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const { notes, totalPages, currentPage, hasMore } = await this.noteService.getPaginatedNotesService(page, limit);

        res.status(200).json({
            status: 'success',
            data: {
                notes,
                totalPages,
                currentPage,
                hasMore
            }
        });
    });
}