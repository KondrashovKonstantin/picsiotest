import yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {UserDao} from '../../dao/user-dao.js';
import {HttpError} from '../../helpers/http-error.js';

export const userSchema = yup.object({
    username: yup.string().required().min(4),
    password: yup.string().required().min(8)
});

export const validateCreateUser = async (req, res, next) => {
    try {
        const {username} = req.body;
        const user = await UserDao.retrieveByUsername(username);
        if (user) {
            throw new HttpError(400, `User with username ${username} already exist`);
        }
        next();    
    } catch (e) {
        next(e);
    }
}

export const validateLogin = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await UserDao.retrieveByUsername(username);
        if (!user) {
            throw new HttpError(404, `User with username ${username} is not exist`);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new HttpError(401, `Invalid username password combination`);
        }
        delete user.password;
        req.scope = {user};
        next();    
    } catch (e) {
        next(e);
    }
};

export const validateToken = async (req, res, next) => {
    try {
        const bareerToken = req.header('Authorization');
        const [,token] = bareerToken.split(' ');
        if (!token) {
            throw new HttpError(401, `User should be logged in`);
        }    
        const authData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const {userId} = authData;
        const user = await UserDao.retrieve(userId);
        delete user.password;
        req.scope = {user};
        next();
    } catch (e) {
        next(e);
    }
};