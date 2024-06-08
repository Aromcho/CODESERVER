import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

// Aplicamos el plugin de paginación al esquema
schema.plugin(mongoosePaginate)

// Creamos el modelo de producto con el esquema definido
const Product = model(collection, schema)

export default Product