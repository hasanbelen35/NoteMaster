import morgan from 'morgan';
import logger from '../utils/logger';
import { StreamOptions } from 'morgan';

const stream: StreamOptions = {
    write: (message: string) => logger.http(message.trim()),
};

const httpLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream }
);

export default httpLogger;