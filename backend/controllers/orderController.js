import { CustomErrorHandler } from '../services';
import { Order } from '../models';

const orderController = {
     // add new order
     async addNewOrder(req, res, next){
         try{
             
             const {
                 shippingInfo,
                 paymentInfo,
                 orderItems,
                 shippingPrice,
                 taxPrice,
                 itemsPrice,
                 totalPrice,

             } = req.body;

             const order = await Order.create({
                shippingInfo,
                paymentInfo,
                orderItems,
                shippingPrice,
                taxPrice,
                itemsPrice,
                totalPrice,
                user: req.user._id,
                paidAt: Date.now()
             });

             if(!order){
                 return next(CustomErrorHandler.serverError());
             }

             res.status(201).json({
                 success: true,
                 message: 'Order placed succesfuly',
                 order
             })
         }catch(err){
             return next(new Error('Something went wrong: ' + err.message));
         }
     },

     // get a single order
     async getSingleOrder(req, res, next) {
         try{
             const order = await Order.findById(req.params.id);

             if(!order){
                 return next(CustomErrorHandler.notFound('No order found with that id'));
             }

             res.status(200).json({
                 success: true,
                 order
             })
         }catch(err){
             return next(new Error('Something went wrong: ' + err.message));
         }
     },

     // get all orders of logged-in user
     async myOrders(req, res, next){
         try{
             const orders = await Order.find({ user: req.user._id }).sort({createdAt: -1});

             if(!orders){
                 return next(CustomErrorHandler.notFound('No orders of logged-in user'));
             }

             res.status(200).json({
                 success:true,
                 message: 'All your orders',
                 AllOrders: orders
             })
         }catch(err){
             return next(new Error('Something went wrong: ' + err.message));
         }
     }
}

export default orderController;