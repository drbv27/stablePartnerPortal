import { Schema, model, models } from "mongoose";

const companySchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [40, 'Name can not be more than 40 characters']
    },
    lastname:{
        type: String,
        required: [true, 'Lastname is required'],
        trim: true,
        maxlength: [40, 'Lastname can not be more than 40 characters']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        maxlength: [40, 'Email can not be more than 40 characters']
    },
    compayName:{
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [40, 'Company name can not be more than 40 characters']
    },
    areaCode:{
        type: String,
        required: [true, 'Zip code is required'],
        trim: true,
        maxlength: [40, 'Zip code can not be more than 40 characters']
    },
    phone:{
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
        maxlength: [40, 'Phone can not be more than 40 characters']
    },
    address1:{
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        maxlength: [40, 'Address can not be more than 40 characters']
    },
    address2:{
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        maxlength: [40, 'Address can not be more than 40 characters']
    },
    city:{
        type: String,
        required: [true, 'City is required'],
        trim: true,
        maxlength: [40, 'City can not be more than 40 characters']
    },
    state:{
        type: String,
        required: [true, 'State is required'],
        trim: true,
        maxlength: [40, 'State can not be more than 40 characters']
    },
    zipCode:{
        type: String,
        required: [true, 'Zip code is required'],
        trim: true,
        maxlength: [40, 'Zip code can not be more than 40 characters']
    },
    siteAnalysis:{
        type: String,
        required: [true, 'Site analysis is required'],
        trim: true,
        maxlength: [40, 'Site analysis can not be more than 40 characters']
    },
    bandwith:{
        type: String,
        required: [true, 'Bandwith is required'],
        trim: true,
        maxlength: [40, 'Bandwith can not be more than 40 characters']
    },
    locationType:{
        type: String,
        required: [true, 'Location type is required'],
        trim: true,
        maxlength: [40, 'Location type can not be more than 40 characters']
    },
    renewalTerms:{
        type: String,
        required: [true, 'Renewal terms is required'],
        trim: true,
        maxlength: [40, 'Renewal terms can not be more than 40 characters']
    },
    paymentTerms:{
        type: String,
        required: [true, 'Payment terms is required'],
        trim: true,
        maxlength: [40, 'Payment terms can not be more than 40 characters']
    }
 })

 const userAccountsSchema = new Schema({
    employees:{
        type: Number,
    },
    faxAccounts:{
        type: Number,
    },
    conferenceRooms:{
        type: Number,
    }
    })

 const singleProductSchema = new Schema({
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
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
    },
    tags: {
        type: [String],
        required: [true, 'Tags is required'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    category:
    {
        type: { type: Schema.Types.ObjectId, ref: 'Category' },
        required: [true, 'Category is required'],
    },
    recurrent: {
        type: Boolean,
        default: false
    },
 })

 const entrieProductSchema = new Schema({
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
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    tags: {
        type: [String],
        required: [true, 'Tags is required'],
    },
    recurrent: {
        type: Boolean,
        default: false
    },
 })

const quoteSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    authUser:{type: Schema.Types.ObjectId, ref: 'User'},
    companyInfo:{
        type: { type: Schema.Types.ObjectId, ref: 'Company' },
        required: [true, 'Company info is required'],
    },
    userAccounts:{
        type: { type: Schema.Types.ObjectId, ref: 'userAccounts' },
        required: [true, 'User accounts is required'],
    },
    singleProducts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'singleProducts' }],
        required: [true, 'Products is required'],
    },
    entrieProducts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'entrieProducts' }],
        required: [true, 'Products is required'],
    },
    total: {
        type: Number,
        required: [true, 'Total is required'],
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
    },
    date: {
        type: Date,
        default: Date.now
    },

 })

export default models.Quote || model('Quote', quoteSchema);