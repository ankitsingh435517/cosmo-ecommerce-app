import { CustomErrorHandler } from "../../services";
import { User, Order } from '../../models';

const adminController  = {
    // get all users
    async getAllUsers(req, res, next) {
        try{
            const users = await User.find();

            if(!users){
                return next(CustomErrorHandler.serverError());
            }

            res.status(200).json({
                success: true,
                message: 'All users',
                users
            })
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    async getASingleUser(req, res, next) {
        try{
            const user = await User.findOne({ _id: req.params.id });

            if(!user){
                return next(CustomErrorHandler.notFound('No user with that id'));
            }

            res.status(200).json({
                success: true,
                user
            });
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // delete a user
    async destroy(req, res, next){
        try{
            const user = await User.findOneAndRemove({ _id: req.params.id });

            if(!user){
                return next(CustomErrorHandler.notFound('No user with that id'));
            }

            res.status(200).json({
                success: true,
                message: 'User deleted successfuly'
            });
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },


    // get all orders
    async getAllOrders(req, res, next){
        try{
            const orders = await Order.find();

            if(!orders){
                return next(CustomErrorHandler.serverError());
            }

            res.status(200).json({
                success: true,
                message: 'All orders',
                orders
            });
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // get a single order
    async getASingleOrder(req, res, next){
        try{
            const order = await Order.findOne({ _id: req.params.id });

            if(!order){
                return next(CustomErrorHandler.notFound('No order with that id'));
            }

            res.status(200).json({
                success: true,
                order
            });
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // delete an order
    async destroyOrder(req, res, next){
        try{
            const order = await Order.findOneAndRemove({_id: req.params.id});

            if(!order){
                return next(CustomErrorHandler.notFound('No order with that id'));
            }

            res.status(200).json({
                success: true,
                message: 'Order deleted successfuly'
            });
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // update order details
    async updateOrder(req, res, next){
        try{
            const order = await Order.findOneAndUpdate({ _id: req.params.id },req.body,{ new: true });

            if(!order){
                return next(CustomErrorHandler.notFound('No order with that id'));
            }

            res.status(201).json({
                success: true,
                message: 'Order updated successfuly',
                order
            });
        }catch(err){
            return next(new Error('Something went wrong: '+err.message));
        }
    }
}

export default adminController;