import express from 'express';
import dbClient from './db/initDb.js';
import {ApiRouter} from './api/_index.js';
import {errorHandler} from './helpers/error-handler.js';
import swaggerDocs from './swagger/swagger.js';

const DEFAULT_PORT=3000;

const app = express();
const port = process.env.PORT || DEFAULT_PORT;

await dbClient.connect();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use((req, res, next) => {
    req.startTime = new Date();
    next();
})
app.use('/api/v1', ApiRouter());
app.use(errorHandler);
swaggerDocs(app);

app.listen(port, () => {
    console.log(`App started at port ${port}`)
});