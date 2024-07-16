import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import productsManager from "../data/mongo/managers/ProductManager.mongo.js";

function getRandomCategory() {
    const categories = ["Accesorios", "Calzado", "Ropa"];
    const randomIndex = faker.datatype.number({ min: 0, max: categories.length - 1 });
    return categories[randomIndex];
  }

async function createData(numProducts = 1000) {
    try {
      await dbConnect(); // Asegurarse de que la base de datos esté conectada
      for (let i = 0; i < numProducts; i++) {
        const product = {
          title: faker.commerce.productName(),
          photo: faker.image.url(), // Imagen aleatoria con ancho 400, alto 600, y aleatorización
          category: getRandomCategory(), // Categoría relacionada con material de productos
          price: parseFloat(faker.commerce.price()),
          stock: faker.datatype.number({ min: 0, max: 1000 }),
        };
        await productsManager.create(product);
      }
      console.log(`${numProducts} productos creados exitosamente`);
    } catch (error) {
      console.log("Error al crear productos: ", error);
    }
  }

createData();

