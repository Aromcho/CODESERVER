import { Schema, Types, model } from "mongoose";

const collection = "users"
const schema = new Schema ({
    email: { type:String, require:true },
    password: { type:String, require:true },
    role: { type:String, require:true },
    photo: { type:String, require:true },
    age: { type:Number, require:true },
    name: { type:String, require:true }
},{
    timestamps: true
})

const User = model(schema, collection)
export default User