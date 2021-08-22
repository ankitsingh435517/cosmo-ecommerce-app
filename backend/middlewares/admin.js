import { CustomErrorHandler } from "../services";

const admin = (req, res, next) => {
    try{
        const role = req.user.role;

        if(!role){
            return next(CustomErrorHandler.unAuthorized());
        }

        if(role === 'admin'){
            next();
        }else{
            return next(CustomErrorHandler.unAuthorized(`Role ${role} is not allowed to access this resource`));
        }
    }catch(err){
        return next(new Error('Something went wrong: '+err.message));
    }
}

export default admin;