import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
      shippingInfo:{
          address:{
              type: String,
              required: true
          },
          postalCode:{
              type: String,
              required: true
          },
          phoneNumber:{
              type: Number,
              required: true
          },
          city:{
              type: String,
              required: true
          },
          country:{
              type: String,
              required: true
          }
      },
      orderItems:[
          {
            name:{
                type: String,
                required: [true, 'Please enter product name'],
                trim: true,
                minlength: [3, 'Product name cannot be fewer than 3 characters']
            },
            price:{
                type: String,
                required: [true, 'Please enter the product price']
            },
            description:{
                type: String,
                required: [true, 'Please enter product description']
            },
            images:[
                {
                    url:{
                        type: String
                    }
                }
            ],
            category:{
                type: String,
                required: [true, 'Please select product category'],
                enum: {
                    values:[
                        'Electronics',
                        'Mobiles',
                        'Laptops',
                        'Clothes/Shoes',
                        'Health/Beauty',
                        'Home',
                        'Indoor',
                        'Sports',
                        'Headphones',
                        'Accessories',
                        'Food',
                        'Cameras',
                        'Watches',
                        'Games'
                    ],
                    message:'Please select some category'
                }
            },
            stock:{
                type: Number,
                required: [true, 'Please enter product stock']
            },
            ratings:{
                type: Number,
                default: 0
            },
            numOfReviews:{
                type: Number,
                default: 0
            },
            reviews:[
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    rating: {
                        type: Number,
                        required: true
                    },
                    comment: {
                        type: String,
                        required: true
                    }
                }
            ],
            seller:{
              type: String,
              required: [true, 'Please enter seller info']
            },
            createdAt:{
                type: Date,
                default: Date.now
            }
          }
      ],
      user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
      },
      shippingPrice:{
          type: String,
          required: true,
          default: 0.0
      },
      itemsPrice:{
          type: Number,
          required: true,
          default: 0.0
      },
      taxPrice:{
          type: Number,
          required: true,
          default: 0.0
      },
      totalPrice:{
          type: Number,
          required: true,
          default: 0.0
      },
      paymentInfo:{
          id: {
              type:String,
            //   required: true 
          },
          status: {
              type: String,
              required: true
          },
          method:{
              type: String,
              required: true
          }
      },
      paidAt:{
          type: Date
      },
      orderStatus:{
          type: String,
          default: 'processing'
      },
      deliveredAt:{
          type: Date
      },
      createdAt:{
          type: Date,
          default: Date.now
      }
})

export default mongoose.model('Order', orderSchema, 'orders');