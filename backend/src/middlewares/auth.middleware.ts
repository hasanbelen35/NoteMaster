import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";


// auth mıddleware to access protected routes
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return unauthorized(res, "You are not logged in!");
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return unauthorized(res, "Invalid token or expired.");
    }

    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    next(error);
  }
};

// get token from cookie first , then from Authorization header if not found in cookie
const extractToken = (req: Request): string | null => {
  if (req.cookies?.token) return req.cookies.token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};


// unauthorized response helper
export const unauthorized = (res: Response, message: string) => {
  return res.status(401).json({
    status: "fail",
    message,
  });
};