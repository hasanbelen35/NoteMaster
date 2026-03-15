import { Router } from "express";
import { NoteService } from '../services/note.service';
import { NoteController } from '../controllers/note.controller';
import { noteSchema } from "../validators/note.validator";
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';

const noteRouter = Router();

const noteService = new NoteService();
const noteController = new NoteController(noteService);

//  NOTE ROUTES 
noteRouter.post('/create-new-note', authMiddleware, validate(noteSchema), noteController.createNoteController);
noteRouter.get('/get-all-notes', authMiddleware, noteController.getAllNotesController);
noteRouter.delete('/delete-note/:id', authMiddleware, noteController.deleteNoteController);
noteRouter.put('/update-note/:id', authMiddleware, validate(noteSchema), noteController.updateNoteController);
noteRouter.get('/feed', authMiddleware, noteController.getPaginatedNotesController);
export default noteRouter;