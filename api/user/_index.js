import {Router} from 'express';
import {CreateUser} from './create.js';
import {Login} from './login.js';

export const UserRouter = () => {
    const router = Router({mergeParams: true});

    router.post('/sign-up', CreateUser);
    router.post('/sign-in', Login);

    return router;
}