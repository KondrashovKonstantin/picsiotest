import client from "../db/initDb.js";

export const route = (fn) => async (req, res, next) => {
    const startTime = req.startTime;
    const endTime = new Date();
    try {
      let result = await fn(req, res, next);  
      if (!result) {
        result = {success: true};
      }
      delete req.body?.password;
      const logData = {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        executionTimeInMs: endTime - startTime,
        responseStatus: 200,
        method: req.method,
        url: req.url,
        originalUrl: req.originalUrl,
        requestBody: req.body,
        responseBody: result
      }
      await client.db().collection('logs').insertOne(logData);
      res.send(result);
    } catch (e) {
      return next(e);
    };
  };
  