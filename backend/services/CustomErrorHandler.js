class CustomErrorHandler extends Error{
    constructor(status, msg){
        super();
        this.status = status;
        this.msg = msg;
    }

    static serverError(message='Internal server error'){
        return new CustomErrorHandler(501, message);
    }

    static notFound(message='404 not found'){
        return new CustomErrorHandler(404, message);
    }

    static alreadyExist(message='Email already exist'){
        return new CustomErrorHandler(421, message);
    }

    static wrongCredentials(message='Email or password is incorrect'){
        return new CustomErrorHandler(422, message);
    }

    static unAuthorized(message='unAuthorized Access'){
        return new CustomErrorHandler(402, message);
    }
}

export default CustomErrorHandler;