import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
     otpHash: {
            type: String,
            select: false
        },
    otpExpiresAt: {
            type: Date,
            select: false
        }
} ,{timestamps: true});

const User = mongoose.model('User', userSchema)

export default User