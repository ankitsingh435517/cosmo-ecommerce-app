import { CustomErrorHandler, JwtService } from '../services';
import { JWT_SECRET } from '../config';

const auth = (req, res, next) => {
    try{

        if(!req.cookies){
            return next(CustomErrorHandler.unAuthorized('Token is not preset currently'));
        }

        const { token } = req.cookies;
        
        // console.log(token);

        if(!token){
            return next(CustomErrorHandler.unAuthorized('No token is supplied'));
        }

        if(token === 'j:null'){
            return next(CustomErrorHandler.unAuthorized('First login to access this resource'))
        }
        
        const { _id, name, role } = JwtService.verify(token, JWT_SECRET);

        // console.log(name);
        
        const user = {
            _id,
            name,
            role
        }

        req.user = user;
        next();
    }catch(err){
        return next(new Error('Something went wrong: ' + err.message));
    }
}

export default auth;