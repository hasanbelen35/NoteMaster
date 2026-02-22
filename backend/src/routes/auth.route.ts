import { Router } from "express";
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { protectedRoute } from '../controllers/protected';
import { registerSchema, loginSchema } from '../validators/authValidator';

const authRouter = Router();

// DEPENDENCY INJECTION 
const authService = new AuthService();
const authController = new AuthController(authService);

//  AUTH ROUTES 
authRouter.post('/register', validate(registerSchema), authController.register);
authRouter.post('/login', validate(loginSchema), authController.login);
authRouter.get("/logout", authController.logout);
authRouter.get("/me", authMiddleware, authController.getMe);
authRouter.get("/protected", authMiddleware, protectedRoute);

export default authRouter;