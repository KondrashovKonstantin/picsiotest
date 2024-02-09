import {Router} from 'express';
import {CreateUser} from './create.js';
import {Login} from './login.js';

export const UserRouter = () => {
    const router = Router({mergeParams: true});
    /** POST Methods */
    /**
     * @openapi
     * '/api/v1/auth/sign-up':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: testuser1
     *                minLength: 6
     *              password:
     *                type: string
     *                default: testpassword
     *                minLength: 8
     *     responses:
     *      200:
     *        description: Created
     *      400:
     *        description: Invalid data
     *      500:
     *        description: Server Error
     */
    router.post('/sign-up', CreateUser);

    /**
     * @openapi
     * '/api/v1/auth/sign-in':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Login by credentials
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: testuser1
     *                minLength: 6
     *              password:
     *                type: string
     *                default: testpassword
     *                minLength: 8
     *     responses:
     *      200:
     *        description: Loged in
     *      401:
     *        description: Invalid credentials
     *      404:
     *        description: User Not Found
     *      500:
     *        description: Server Error
     */
    router.post('/sign-in', Login);

    return router;
}