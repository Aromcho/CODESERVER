import { Schema, Types, model } from "mongoose";

const collection = "carts"
const schema = new Schema ({
    user_id: { type:String, require:true },
    product_id: { type:String, require:true },
    quantity: { type:Number, require:true },
    state: { type:String, require:true },
},{
    timestamps: true
})
const Cart = model(schema, collection)
export default Cart