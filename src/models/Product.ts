import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        maxlength: [40, 'Category can not be more than 40 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [2000, 'Description can not be more than 2000 characters']
    },
    images: {
        type: [String],
        required: [true, 'Images is required'],
    },
    inStock: {
        type: Number,
        required: [true, 'InStock is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    sizes: {
        type: [String],
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
    },
    tags: {
        type: [String],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    category:
    {
        type: Schema.Types.ObjectId, 
        ref: 'Category' ,
        required: [true, 'Category is required'],
    },
    recurrent: {
        type: Boolean,
        default: false
    },
 })

export default models.Product || model('Product', ProductSchema);