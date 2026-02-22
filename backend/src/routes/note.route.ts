import { Router } from "express";
import { NoteService } from '../services/note.service';
import { NoteController } from '../controllers/note.controller';
import { noteSchema } from "../validators/note.validator";
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';

const noteRouter = Router();

// DEPENDENCY INJECTION
const noteService = new NoteService();
const noteController = new NoteController(noteService);

//  NOTE ROUTES 
noteRouter.post('/notes/create-new-note', authMiddleware, validate(noteSchema), noteController.createNoteController);
noteRouter.get('/notes/get-all-notes', authMiddleware, noteController.getAllNotesController);
noteRouter.delete('/notes/delete-note/:id', authMiddleware, noteController.deleteNoteController);
noteRouter.put('/notes/update-note/:id', authMiddleware, validate(noteSchema), noteController.updateNoteController);

export default noteRouter;