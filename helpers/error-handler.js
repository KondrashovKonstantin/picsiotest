import client from "../db/initDb.js";
import {HttpError} from "./http-error.js";

export const errorHandler = async (err, req, res, next) => {
    const startTime = req.startTime;
    const endTime = new Date();
    delete req.body?.password;
    const resCode = (err instanceof HttpError) ? (err.code || 500) : 500;
    const response = {
        code: resCode,
        message: err.message,
    };
    const logData = {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        executionTimeInMs: endTime - startTime,
        method: req.method,
        responseStatus: resCode,
        url: req.url,
        originalUrl: req.originalUrl,
        requestBody: req.body,
        responseBody: response
      }
    await client.db().collection('logs').insertOne(logData);
    res.status(response.code).send(response);
}