import winston from 'winston';
import path from 'path';

const logDir = 'logs';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        // Konsola renkli yaz
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                errors({ stack: true }),
                logFormat
            ),
        }),
        // Tüm loglar
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
        }),
        // Sadece errorlar
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
        }),
    ],
});

export default logger;