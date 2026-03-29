import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AuthService } from '../services/auth.service';
import logger from '../utils/logger';

export class AuthController {
  constructor(private AuthService: AuthService) { }

  // REGISTER CONTROLLER
  register = catchAsync(async (req: Request, res: Response) => {
    // LOGGING
    logger.info(`Registration attempt: ${req.body.email}`);

    const user = await this.AuthService.registerUserService(req.body);
    // LOGGING

    logger.info(`User registered successfully: ${user.email} (ID: ${user.id || 'N/A'})`);

    res.status(201).json({
      status: 'success',
      data: user
    });
  });

  // LOGIN CONTROLLER
  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // LOGGING

    logger.info(`Login attempt: ${email}`);

    const result = await this.AuthService.loginUserService(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: '/',
      maxAge: 60 * 60 * 1000
    });
    // LOGGING

    logger.info(`Login successful: ${email}`);

    res.status(200).json({
      status: 'success',
      data: result
    });
  });

  // LOGOUT CONTROLLER  
  logout = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId ;

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    // LOGGING

    logger.info(`Logout successful for: ${userId}`);

    return res.status(200).json({
      status: 'success',
      message: 'Logout successful.'
    });
  });

  // GET ME USER
  getMe = catchAsync(async (req: Request, res: Response) => {
    if (!req.user || !req.user.userId) {
      // LOGGING
      logger.warn(`Unauthorized getMe access attempt from IP: ${req.ip}`);

      return res.status(401).json({
        status: "fail",
        message: "Unauthorized"
      });
    }

    const user = await this.AuthService.getMeService(req.user.userId);
    // LOGGING

    logger.info(`User profile retrieved: ${user.email}`);

    res.status(200).json({
      status: "success",
      data: user
    });
  });
};