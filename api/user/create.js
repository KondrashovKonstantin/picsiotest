import bcrypt from 'bcrypt';
import {validateRequest} from '../../helpers/validate-request.js';
import {userSchema, validateCreateUser} from './validate.js';
import {UserDao} from '../../dao/user-dao.js';
import {route} from '../../helpers/route.js';

export const CreateUser = [
    validateRequest({
        body: userSchema
    }),
    validateCreateUser,
    route(async (req, res) => {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserDao.create({username, password: hashedPassword});
        return {message: 'user created successfully'};
    })
];