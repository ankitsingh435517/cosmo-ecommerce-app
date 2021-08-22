import express from 'express';
import { adminController } from '../controllers';
import { auth, admin } from '../middlewares';

const router  = express.Router();

// user routes for admin
router.get('/admin/users/index', [auth, admin], adminController.getAllUsers);

router.get('/admin/user/show/:id', [auth, admin], adminController.getASingleUser);

router.delete('/admin/user/delete/:id', [auth, admin], adminController.destroy);

// order routes for admin
router.get('/admin/orders/index', [auth, admin], adminController.getAllOrders);

router.get('/admin/order/show/:id', [auth, admin], adminController.getASingleOrder);

router.delete('/admin/order/delete/:id', [auth, admin], adminController.destroyOrder);

router.put('/admin/order/update/:id', [auth, admin], adminController.updateOrder);

export default router;