import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AuthService } from '../services/auth.service';



export class AuthController {
  // get into AuthController with dependency injection
  constructor(private AuthService: AuthService) { }

  // REGISTER CONTROLLER
  register = catchAsync(async (req: Request, res: Response) => {
    const user = await this.AuthService.registerUserService(req.body);

    res.status(201).json({
      status: 'success',
      data: user
    });
  });

  // LOGIN CONTROLLER
  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.AuthService.loginUserService(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: '/',
      maxAge: 60 * 60 * 1000
    });

    res.status(200).json({
      status: 'success',
      data: result
    });
  });


  // LOGOUT CONTROLLER  

  logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.status(200).json({
      status: 'success',
      message: 'Logout successful.'
    });
  });

  // GET ME USER
  getMe = catchAsync(async (req: Request, res: Response) => {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized"
      });
    }

    const user = await this.AuthService.getMeService(req.user.userId);

    res.status(200).json({
      status: "success",
      data: user
    });
  });

};
