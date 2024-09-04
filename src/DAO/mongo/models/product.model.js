import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema({
    title: { type: String, required: true },
    photo: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    user_id: { type: String, required: true }, // Relacionar con el usuario
}, {
    timestamps: true
});

// Aplicamos el plugin de paginación al esquema
schema.plugin(mongoosePaginate);

// Creamos el modelo de producto con el esquema definido
const Product = model(collection, schema);

export default Product;
