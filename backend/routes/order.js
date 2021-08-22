import express from 'express';
import { orderController } from '../controllers';
import { auth } from '../middlewares';

const router = express.Router();

router.post('/order/new', auth, orderController.addNewOrder);

router.get('/order/show/:id', auth, orderController.getSingleOrder);

router.get('/orders/user/index', auth, orderController.myOrders);

export default router;