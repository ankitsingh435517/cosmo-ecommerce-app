import express from 'express';
import { userController } from '../controllers';
import { auth } from '../middlewares';

const router = express.Router();

// user routes
router.post('/user/register/new', userController.registerUser);

router.post('/user/login', userController.login);

router.get('/user/logout', auth, userController.logout);

router.get('/user/me/show', auth, userController.me);

router.put('/user/me/update', auth, userController.updateUserProfile);

router.post('/user/me/checkOldPassword', auth, userController.checkOldPassword);

router.put('/user/me/updatePassword', auth, userController.updatePassword);

router.post('/user/me/forgotPassword',  userController.forgotPassword);

router.put('/user/me/resetPassword/:token',  userController.resetPassword);


export default router;