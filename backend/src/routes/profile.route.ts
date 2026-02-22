import { Router } from "express";
import { ProfileController } from '../controllers/profile.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { updateProfileSchema } from "../validators/profile.validator";
import { ProfileService } from '../services/profile.service';

import { validate } from '../middlewares/validate';
const profileRouter = Router();

//DEPENDENCY INJECTION
const profileService = new ProfileService();
const profileController = new ProfileController(profileService);


//  PROFILE ROUTES 
profileRouter.get('/profile/me', authMiddleware, profileController.getProfileByUserId);
profileRouter.put('/profile/edit-profile', authMiddleware, validate(updateProfileSchema), profileController.updateProfile);

export default profileRouter;