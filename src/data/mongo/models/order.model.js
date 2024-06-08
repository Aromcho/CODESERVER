import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema({
    user_id: { type: Types.ObjectId, required: true, ref: "users", index: true},
    //event_id: [{ type: Types.ObjectId, required: true, ref: "events" }],
    quantity: { type: Number,default: 1 },
    state: { type: String, default: "reserver", enum: ["reserver", "payed", "delivered"], index: true},
},{
    timestamps: true
});

schema.pre('find', function() {
    this.populate('user_id', "email name -_id");
});
schema.pre('findOne', function() {this.populate('product_id', 'email');});

const Order = model(collection, schema);
export default Order;   