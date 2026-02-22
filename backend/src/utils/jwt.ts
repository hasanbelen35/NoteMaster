import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET as string;
// utils/jwt.ts

interface JwtPayload {
  userId: number;
  email: string;

};

export const generateToken = (payloadData: { userId: number, email: string }) => {
  return jwt.sign(
    {
      userId: payloadData.userId,
      email: payloadData.email
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    throw new Error("Invalid or expired token");

  }
};