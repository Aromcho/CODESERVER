import { Schema, Types, model } from "mongoose";

const collection = "users";
const schema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", index: true },
    photo: { type: String, required: true },
    age: { type: Number, required: false },
    name: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
}, {
    timestamps: true
});

const User = model(collection, schema);
export default User;
