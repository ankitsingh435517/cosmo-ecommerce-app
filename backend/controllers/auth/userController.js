import { User } from '../../models';
import Joi from 'joi';
import { CustomErrorHandler, JwtService, sendEmail } from '../../services';
import crypto from 'crypto';

const userController = {
    // register a user
    async registerUser(req, res, next) {
        try{
            // req validation
            const registerSchema = Joi.object({
                name: Joi.string().min(3).max(30).required(),
                email: Joi.string().email().required(),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
            });

            const { error } = registerSchema.validate(req.body);

            if(error){
                return next(error);
            }

            // check if email already exists in db
            const exist = await User.findOne({ email: req.body.email });

            if(exist){
                return next(CustomErrorHandler.alreadyExist());
            }

            // pre save hash password

            // save user in db
            const newUser = await User.create(req.body);

            if(!newUser){
                return next(CustomErrorHandler.serverError('Something went wrong while saving the user'));
            }

            // create and store token in cookie and send response
            JwtService.sendToken(201, newUser, res);

        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // login 
    async login(req, res, next) {
        try{
            const loginSchema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
            });

            const { error } = loginSchema.validate(req.body);

            if(error){
                return next(error);
            }

            const user = await User.findOne({ email: req.body.email }).select('+password');

            if(!user){
                return next(CustomErrorHandler.notFound('Email does not exist'));
            }

            const match = await user.comparePassword(req.body.password);

            if(!match){
                return next(CustomErrorHandler.wrongCredentials());
            }

            // all ok, so create token and store in cookie then send response
            JwtService.sendToken(201, user, res);

        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // logout
    async logout(req, res, next){
        try{
            const user = await User.findById(req.user._id).select('-password');

            if(!user){
                return next(CustomErrorHandler.unAuthorized('No user related to this id'));
            }

            res.cookie('token', null, {
                expire: new Date(
                    Date.now()
                ),
                httpOnly: true
            });

            res.status(200).json({
                success: true,
                message: 'Logged Out successfuly'
            })
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // who is this user
    async me(req, res, next) {
        try{
            const user = await User.findOne({ _id: req.user._id });

            if(!user){
                return next(CustomErrorHandler.notFound('No user with that id'))
            }

            res.status(200).json({
                success: true,
                user
            })
            
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // update user profile
    async updateUserProfile(req, res, next){
        try{
            const updateSchema = Joi.object({
                name: Joi.string(),
                email: Joi.string().email()
            }).unknown(true)

            const { error } = updateSchema.validate(req.body);

            if(error){
                return next(error);
            }

            const user = await User.findByIdAndUpdate(req.user._id,req.body, {new: true});

            if(!user){
                return next(new CustomErrorHandler.unAuthorized('user not logged in or not found'))
            }

            //save token in cookie and send response
            JwtService.sendToken(201, user, res);

        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // reset password
    async updatePassword(req, res, next){
        try{
            const user = await User.findById(req.user._id).select('+password');

            if(!user){
                return next(CustomErrorHandler.unAuthorized());
            }

            // const match = await user.comparePassword(req.body.old_Password);

            // if(!match){
            //     return next(CustomErrorHandler.wrongCredentials('Entered password is incorrect'));
            // }

            const resetPasswordSchema = Joi.object({
                new_Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
                confirm_New_Password: Joi.ref('new_Password')
            }).unknown(true)

            const { error } = resetPasswordSchema.validate(req.body);

            if(error){
                return next(error);
            }

            user.password = req.body.new_Password;

            await user.save();

            //save token in cookie and send response
            JwtService.sendToken(201, user, res);

        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // check old password
    async checkOldPassword(req, res, next) {
        try{
            const user = await User.findById(req.user._id).select('+password');

            if(!user){
                return next(CustomErrorHandler.unAuthorized());
            }

            const match = await user.comparePassword(req.body.old_Password);

            if(!match){
                return next(CustomErrorHandler.wrongCredentials('Entered password is incorrect'));
            }

            res.status(200).json({
                success: true,
                message: 'Entered Password is correct'
            })
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // forgot password
    async forgotPassword(req, res, next){
        try{
            const forgotPasswordSchema = Joi.object({
                email: Joi.string().email().required()
            });

            const { error } = forgotPasswordSchema.validate(req.body);

            if(error){
                return next(error);
            }

            const user = await User.findOne({email: req.body.email});

            if(!user){
                console.log(user)
                return next(CustomErrorHandler.notFound('Email does not exist'));
            }

            const resetToken = user.getResetPasswordToken();

            // save user after setting reset password token and expire
            await user.save({ validateBeforeSave: false });
            
            const resetUrl = `${req.protocol}://localhost:3000/resetPassword/${resetToken}`;

            try{
                await sendEmail({
                    email:user.email,
                    subject: 'cosmo recovery email',
                    resetUrl
                });

                // window.alert('The Recovery mail has been sent to your email')
               
                res.status(201).json({
                    success: true,
                    message: `Email sent to ${user.email}`,
                })
            }catch(err){
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;

                await user.save({ validateBeforeSave: false });

                return next(new Error('Something went wrong: ' + err.message));
            }

        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // reset pasword
    async resetPassword(req, res, next){
        try{
            const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

            const user = await User.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() }
            });

            if(!user){
                return next(CustomErrorHandler.unAuthorized('Recovery link or reset token has been expired'));
            }

            const resetPasswordSchema = Joi.object({
                new_Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
                confirm_New_Password: Joi.ref('new_Password')
            });

            const { error } = resetPasswordSchema.validate(req.body);

            if(error){
                return next(error);
            }

            user.password = req.body.new_Password;

            user.resetPasswordToken = undefined;
            
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            JwtService.sendToken(201, user, res);
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

   
}

export default userController;