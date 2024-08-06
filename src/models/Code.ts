import mongoose,{ Schema, Model, models,ObjectId } from "mongoose";

interface ICode extends Document {
    _id:ObjectId;
    since: string;
    to: string;
    code: string;
    discount: number;
    // define your document properties here
  }

const CodeSchema = new Schema({
    _id:{
        type: String,
    },
    code: {
        type: String,
        required: [true, 'Code is required'],
        trim: true,
        maxlength: [50, 'Code can not be more than 50 characters']
    },
    discount: {
        type: Number,
    },
    since: {
        type: String,
    },
    to: {
        type: String,
    }
 })

 const Code: Model<ICode> = mongoose.models.promocodes || mongoose.model<ICode>('promocodes', CodeSchema);
 export default Code;
/* export default models.Code || model('promocodes', CodeSchema); */