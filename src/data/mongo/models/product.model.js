import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, require: true, index: true },
    photo: { type: String, require: true },
    photo2: { type: String, require: false },
    photo3: { type: String, require: false },
    photo4: { type: String, require: false },
    category: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    description: { type: String, require: false },
    color: { type: [String], require: true },
    size: { type: [String], require: true },
  },
  {
    timestamps: true,
  }
);

// Aplicamos el plugin de paginación al esquema
schema.plugin(mongoosePaginate);
// indexado para la busqueda de productos
schema.index({ title: 'text', description: 'text', category: 'text' });

// Creamos el modelo de producto con el esquema definido
const Product = model(collection, schema);

export default Product;
