import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import logger from '../utils/logger'; // Kendi logger yoluna göre burayı düzenle

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message;

  // --- 1. PRISMA ERRORS ---
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002
    if (err.code === 'P2002') {
      const field = Array.isArray(err.meta?.target) 
        ? err.meta.target.join(', ') 
        : err.meta?.target;
      error.message = `Bu ${field} zaten kullanımda. Lütfen farklı bir değer girin.`;
      error.statusCode = 400;
    }
    
    // P2025
    if (err.code === 'P2025') {
      error.message = 'İstenen kayıt veritabanında bulunamadı.';
      error.statusCode = 404;
    }
  }

  // --- WINSTON LOGGING ---
  const logDetails = {
    message: error.message,
    statusCode: error.statusCode,
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
    stack: err.stack, 
    timestamp: new Date().toISOString(),
  };

  if (error.statusCode >= 500) {
    logger.error(`CRITICAL_ERROR: ${error.message}`, logDetails);
  } else {
    logger.warn(`APP_WARNING: ${error.message}`, logDetails);
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('💥 Error Logged:', {
      status: error.status,
      message: error.message,
      stack: err.stack
    });
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};