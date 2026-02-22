import prisma from '../database/db';
import { hashPassword } from '../utils/hash.util';
import { AppError } from '../utils/appError';
import bcrypt from "bcrypt";
import { generateToken } from '../utils/jwt';
import { RegisterDto } from '../types/auth.type';
// REGISTER DTO

export class AuthService {
  ///////////////// REGISTER USER SERVICE //////////////////
  registerUserService = async (userData: RegisterDto) => {
    const { email, password, name, surname } = userData;

    if (!email || !password || !name || !surname) {
      throw new AppError("Lütfen tüm alanları doldurun.", 400);
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError("Bu e-posta adresi zaten kullanımda.", 400);
    }

    const hashedPassword = await hashPassword(password);

    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        surname,
        profile: {
          create: {}
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        createdAt: true
      }
    });
  };


  ///////////////// LOGIN USER SERVICE //////////////////
  loginUserService = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError("INVALID EMAIL OR password.", 401);
    };

    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("INVALID EMAIL OR password.", 401);
    };
    // jwt token
    const token = generateToken({ userId: user.id, email: user.email });
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
      token: token
    }
  };

  // GET LOGGED IN USER SERVICE
  getMeService = async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        createdAt: true
      }
    });
    if (!user) {
      throw new AppError("User not found.", 404);
    }
    return user;
  };
};




