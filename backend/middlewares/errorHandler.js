import { CustomErrorHandler } from '../services';
import { DEBUG_MODE } from '../config';
import { ValidationError } from 'joi';

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let data = {
        message: 'Internal server error',
        ...(DEBUG_MODE==='true' && { OriginalError: err.message })
    }

    if(err instanceof CustomErrorHandler){
        statusCode = err.status;
        data = {
            message: err.msg
        }
    }

    if(err instanceof ValidationError){
        statusCode = 422;
        data = {
            message: err.message
        }
    }

    res.status(statusCode).json({
        status:statusCode,
        message: data.message,
        error: data.OriginalError
    });
}

export default errorHandler;