import mongoose from 'mongoose';
import  validator  from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        minlength: [3, 'Your name should not be fewer than 3 characters'],
        maxlength: [30, 'our name cannot exceed 30 characters'],
        trim: true
    },
    email:{
        type: String,
        reuired: [true, 'Please enter your email address'],
        unique: [true, 'Email already exist'],
        validate:{
            validator: validator.isEmail,
            message: 'Entered email is not valid'
        }
    },
    password:{
        type: String,
        required: [true, 'Please select a password'],
        select: false
    },
    role:{
        type: String,
        default: 'customer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// hash password pre saving
userSchema.pre('save', async function(next)  {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// generate reset password token and save in user model
userSchema.methods.getResetPasswordToken = function() {

    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}
export default mongoose.model('User', userSchema, 'users');