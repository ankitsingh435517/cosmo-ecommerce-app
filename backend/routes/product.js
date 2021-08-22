import express from 'express';
import { productController } from '../controllers';
import { auth } from '../middlewares';

const router = express.Router();

router.post('/product/new', productController.addNewProduct);


router.get('/products/trending/index', productController.getTrendingProducts);

router.get('/product/show/:id', productController.getSingleProduct);


router.delete('/product/delete/:id', productController.destroyProduct);


router.put('/product/update/:id', productController.updateProduct);


router.post('/products/cart-items', productController.getCartProducts);

// reviews

router.put('/product/review/new', auth, productController.addNewReview);

router.get('/product/reviews/index',  productController.showAllReviews);

router.delete('/product/review/destroy', auth, productController.destroyReview);

export default router;