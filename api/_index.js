import {Router} from 'express';
import {UserRouter} from './user/_index.js';
import {EventRouter} from './event/_index.js';

export const ApiRouter = () => {
    const router = Router({mergeParams: true});

    router.use('/auth', UserRouter());
    router.use('/event', EventRouter());
    return router;
}