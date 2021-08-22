import Jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRY, COOKIE_EXPIRY } from '../config';
import CustomErrorHandler from './CustomErrorHandler';

class JwtService{
    static sign(payload, secret, expiry){
       return Jwt.sign(payload, secret, { expiresIn: expiry });
    }

    static verify(token, secret){
        return Jwt.verify(token, secret);
    }

    static sendToken(statusCode, user, res){
        try{
            // console.log(user.name);
            
            const token = this.sign({ _id: user._id, name: user.name, role: user.role }, JWT_SECRET, JWT_EXPIRY);

            if(!token){
                return next(CustomErrorHandler.serverError('Error while signing token'));
            }

            const options = {
                expire: new Date(
                    Date.now() + COOKIE_EXPIRY * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }

            res.status(statusCode).cookie('token', token, options).json({
                success: true,
                token,
                user
            });
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    }
}

export default JwtService;