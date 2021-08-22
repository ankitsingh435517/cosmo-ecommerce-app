import { Product } from '../models';
import cloudinary from 'cloudinary';
import { CustomErrorHandler, ApiFeature } from '../services';

const productController = {
    // add new product
    async addNewProduct(req, res, next) {
        // console.log(req.files.images.tempFilePath);
        try{
            let imgPath;

            // console.log()
            if(req.files && req.files.images){
                imgPath = req.files.images.tempFilePath;
             }
             else if(req.body.images){
                imgPath = req.body.images;
             }

            const result = await cloudinary.v2.uploader.upload(imgPath, {
                folder: 'products'
            })
            
            if(!result){
                return next(CustomErrorHandler.serverError('Error occured while uploading images'));
            }
    
            const {
                name,
                price,
                description,
                stock,
                category,
                seller
            } = req.body;
    
            let _reviews = [];
    
            const product = await Product.create({
                name,
                price,
                description,
                stock,
                category,
                seller,
                reviews:_reviews,
                images: [
                    {
                        url: result.url
                    }
                ]
            });
    
            if(!product){
                return next(CustomErrorHandler.serverError('while saving'));
            }
    
            res.status(201).json({
                success:true,
                message: 'Product added successfuly',
                product
            });

        }catch(err){
            console.log(err)
            return next(new Error('Something went wrong: ' + err));
        }
    },


    // get all products
    async getTrendingProducts(req, res, next){
        try{
            const apiFeature = new ApiFeature(Product.find(), req.query)
                                    .search()
            // console.log(apiFeature);
            const products = await apiFeature.query;

            if(products.length === 0){
                return next(CustomErrorHandler.notFound('No products yet'));
            }

            res.status(200).json({
                success:true,
                totalProducts: products.length,
                products
            });
        }catch(err){
            // console.log(err)
            return next(new Error('Something went wrong: ' + err.message));
        }
    },


    // get a single product
    async getSingleProduct(req, res, next){
        try{
            const product = await Product.findById(req.params.id).select('-__v');

            if(!product){
                return next(CustomErrorHandler.notFound('No product with that id'));
            }

            res.status(200).json({
                success: true,
                product
            });
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // delete a product
    async destroyProduct(req, res, next){
        try{
            const product = await Product.findByIdAndRemove(req.params.id).select('-__v');

            if(!product){
                return next(CustomErrorHandler.notFound('No product with that id found to be deleted'));
            }

            res.status(200).json({ 
                success: true,
                message: 'Product deleted successfuly'
            });

        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // update a product
    async updateProduct(req, res, next){
        try{
            let imgPath;
            // console.log(req.files)
            // console.log(req.body.images)

            if(req.files && req.files.images){
               imgPath = req.files.images.tempFilePath;
            }
            else if(req.body.images){
               imgPath = req.body.images;
            }

            // console.log(req.files.images.tempFilePath);

            const result = await cloudinary.v2.uploader.upload(imgPath, {
                folder: 'products'
            });

            if(!result){
                return next(CustomErrorHandler.serverError('Error occurred while uploading img'));
            }

            const oldProduct = await Product.findById(req.params.id);

            if(!oldProduct){
                return next(CustomErrorHandler.notFound('No product with that id'));
            }

            const product = await Product.findOneAndUpdate(req.params.id, {
                name: req.body.name ? req.body.name : oldProduct.name,
                price: req.body.price ? req.body.price : oldProduct.price,
                description: req.body.description ? req.body.description : oldProduct.description,
                stock: req.body.stock ? req.body.stock : oldProduct.stock,
                category: req.body.category ? req.body.category : oldProduct.category,
                seller: req.body.seller ? req.body.seller : oldProduct.seller,
                reviews: req.body.reviews ? req.body.reviews : oldProduct.reviews,
                images: {
                    url: (req.files && req.files.images || req.body.images) ? result.url : oldProduct.images[0].url
                }
            }, { new: true });

            // if(!product){
            //     return next(CustomErrorHandler.notFound(''));
            // }

            res.status(201).json({
                success: true,
                product
            });
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },








    // get all cart products
    async getCartProducts(req, res, next) {
        let documents;
        try{
             documents = await Product.find({
                _id: { $in: req.body.ids }
            });

        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
       return res.json(documents);
    },









   // add new product review
    async addNewReview(req, res, next) {
        try{
            const product = await Product.findOne({ _id: req.body.productId });

            if(!product){
                return next(CustomErrorHandler.notFound('No product with that id'));
            }

            const { rating, comment, productId } = req.body;

            
            const review = {
                name: req.user.name,
                user: req.user._id,
                rating,
                comment
            }

            const isReviewed = product.reviews.find(review =>
                review.user.toString() === req.user._id.toString());

                if(isReviewed){
                    product.reviews.forEach(review => {
                        if(review.user.toString() === req.user._id.toString()){
                            review.name = req.user.name,
                            review.user = req.user._id,
                            review.rating = rating,
                            review.comment = comment
                        }
                    })
                }else{
                    product.reviews.push(review);
                    product.numOfReviews = product.reviews.length;
                }

                product.ratings = product.reviews.reduce((acc,item) => item.rating + acc,0)/product.reviews.length;

                // save product changes
                await product.save({ validateBeforeSave: false });

                // console.log(review);
                // send response
                res.status(201).json({
                    success: true,
                    message: 'Product review updated successfuly',
                    review: product.reviews.filter(review => 
                        review.user.toString() === req.user._id.toString())
                });
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // get all product reviews
    async showAllReviews(req, res, next){
        try{
            const product = await Product.findOne({ _id: req.query.productId });

            if(!product){
                return next(CustomErrorHandler.notFound('No product with that id'));
            }

            res.status(201).json({
                success: true,
                message: 'All reviews of this product',
                totalReviews: product.reviews.length,
                AllReviews: product.reviews
            })
        }catch(err){
            return next(new Error('Something went wrong: ' + err.message));
        }
    },

    // delete a product review
    async destroyReview(req, res, next){
        try{
            const product = await Product.findOne({ _id: req.query.productId });

            if(!product){
                return next(CustomErrorHandler.notFound('No product with that id'));
            }

            const remainingReviews = product.reviews.filter(review => 
                review.user.toString() !== req.user._id.toString())

                if(remainingReviews.length === product.reviews.length){
                    return next(CustomErrorHandler.notFound('No review found to be deleted'));
                }

                const numOfReviews = remainingReviews.length;

                // console.log(numOfReviews);

                let overallRating = 0;

                if(numOfReviews > 0){
                   overallRating = remainingReviews.reduce((acc, item) => item.rating + acc, 0)/numOfReviews;
                }
                
                // console.log(overallRating)
                
                await Product.findOneAndUpdate({ _id: req.query.productId }, {
                      reviews: remainingReviews,
                      numOfReviews,
                      ratings: Number(overallRating)
                }, {new: true})

                res.status(200).json({
                    success: true,
                    message: 'Product review deleted successfuly'
                });

        }catch(err){
            // console.log(err);
            return next(new Error('Something went wrong: ' + err.message));
        }
    }
}

export default productController;