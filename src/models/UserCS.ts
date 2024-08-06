import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,"Fullname is required"],
        minLenght: [3,"Fullname must be at least 3 characters"],
        maxLenght: [50,"Fullname must be at most 50 characters"],
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                "Please fill a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        select: false,//esto es para que no devuelva el password
    },
    role: {
        type: String,
        enum: ["admin","user"],
        default: "user",
    },
},
{
    timestamps: true,
}

);

export default models.UserCS || model('User', userSchema);