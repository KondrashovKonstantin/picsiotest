import {Router} from 'express';
import {RouteEvent} from './route.js';
import {validateToken} from '../user/validate.js';

export const EventRouter = () => {
    const router = Router({mergeParams: true});

    router.post('/', [validateToken, RouteEvent]);

    return router;
}