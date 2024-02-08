import yup from 'yup';
import {HttpError} from './http-error.js';

export const validateRequest = (schema) => async (req, res, next) => {
    try {
        //strict mode compare schema and request
        await yup.object().strict(true).shape(schema).validate(req);
        next();
    } catch (e) {
        next(new HttpError(400, e));
    }
}