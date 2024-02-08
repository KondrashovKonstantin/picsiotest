import jwt from 'jsonwebtoken'
import {validateRequest} from '../../helpers/validate-request.js';
import {userSchema, validateLogin} from './validate.js';
import { route } from '../../helpers/route.js';

export const Login = [
    validateRequest({
        body: userSchema
    }),
    validateLogin,
    route(async (req, res) => {
        const {user} = req.scope;
        const token = jwt.sign(
            {userId: user._id, time: new Date()},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '1d'}
        );
        return {user, token};
    })
];