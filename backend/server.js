import express from 'express';
import { APP_PORT, DB_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, 
    CLOUDINARY_API_SECRET, STRIPE_SECRET_TEST } from './config';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';
import {errorHandler} from './middlewares';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const stripe = require('stripe')(STRIPE_SECRET_TEST)
const port = process.env.PORT || 2000;

// routes
import { product, user, order, admin } from './routes';

const app = express();

// uncaught exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exceptions');
    process.exit(1);
});

// 'mongodb://superAdmin:fbb80fe1@localhost:27017/cosmo?authSource=admin&w=1'

// db connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
});
const db = mongoose.connection;
db.on('err', () => console.log(err));
db.once('open', () => console.log('Database connected...'));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}))

// app.enable('trust proxy')
// // app.use((req, res) => {
// //     res.redirect('https://' + req.headers.host + req.url);
// //     next();
// // })

// app.use((req,res,next) => {
//     console.log(req.protocol);
//     if (!/https/.test(req.protocol)){
//        res.redirect("https://" + req.headers.host + req.url);
//     } else {
//        return next();
//     } 
//   });

// cloudinary config
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

// payment route
app.post('/payment', cors(), async (req, res, next) => {
    let { amount, id } = req.body;
    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'INR',
            description:'cosmo company',
            payment_method: id,
            confirm: true
        })

        // console.log("Payment", payment)

        res.status(201).json({
            success: true,
            message: 'Payment successful',
            payment
        })
    }catch(err){
        return next(new Error('Something went wrong: '  + err.message));
    }
} )

// use routes
  // products
  app.use('/cosmo/api/v1', product);

  // user
  app.use('/cosmo/api/v1', user);

  // order
  app.use('/cosmo/api/v1', order);

  // admin
  app.use('/cosmo/api/v1', admin);

  
// heroku app
if(process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"))
    const path = require('path');
    app.get("*",(req, res) => {
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}

// middleware 
app.use(errorHandler);

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

// unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    })
})