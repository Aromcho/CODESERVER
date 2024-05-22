import { Schema, Types, model } from "mongoose";

const collection = "products"
const schema = new Schema ({
    title: { type:String, require:true },
    photo: { type:String, require:true },
    category: { type:String, require:true },
    price: { type:Number, require:true },
    stock: { type:Number, require:true }
},{
    timestamps: true
})
const Product = model( collection, schema)
export default Product