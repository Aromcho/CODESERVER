// modelo de ticket para mongo el precio total del carrito
import { Schema, Types, model } from "mongoose";

const collection = "tickets"

const schema = new Schema ({
    user: { type: Types.ObjectId, ref: "users", require: true },
    products: [{ type: Types.ObjectId, ref: "products", require: true }],
    total: { type:Number, require:true }
},{
    timestamps: true
})

const Ticket = model( collection, schema)
export default Ticket

