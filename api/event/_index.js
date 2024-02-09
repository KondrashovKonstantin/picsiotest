import {Router} from 'express';
import {RouteEvent} from './route.js';
import {validateToken} from '../user/validate.js';

export const EventRouter = () => {
    const router = Router({mergeParams: true});
    /** POST Methods */
    /**
     * @openapi
     * '/api/v1/event/':
     *  post:
     *     security:
     *       - bearerAuth: []
     *     tags:
     *     - Event Controller
     *     summary: Route payload of event to destinations according to strategy
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - payload
     *              - possibleDestinations
     *            properties:
     *              payload:
     *                type: object
     *                default: { "a": 1, "b": 2 }
     *              possibleDestinations:
     *                type: array
     *                items:
     *                  type: object
     *                default: [{ "destination1": true, "destination2": true }, {"destination1":false}]
     *              strategy:
     *                type: string
     *                default: ANY
     *     responses:
     *      200:
     *        description: Payload routed
     *      400:
     *        description: Invalid data
     *      500:
     *        description: Server Error
     */
    router.post('/', [validateToken, RouteEvent]);

    return router;
}