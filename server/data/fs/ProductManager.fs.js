const fs = require("fs");
const crypto = require("crypto")


module.exports = class ProductManager {
    static quantity = 0;
    static #products = [];
    static filePath = "./products.json"; 

    constructor() {
        if (!fs.existsSync(ProductManager.filePath)) {
            fs.writeFileSync(ProductManager.filePath, JSON.stringify([]));
        }
    }

    create(data) {
        const product = {
            id: crypto.randomBytes(12).toString("hex"), 
            title: data.title || "Sin título",
            photo: data.photo || "default.jpg",
            category: data.category || "Sin categoría",
            price: data.price || 0,
            stock: data.stock || 0
        };

        try {
            if (!product.title || !product.price || !product.stock) {
                throw new Error("Faltan propiedades obligatorias para crear el producto.");
            }

            const products = JSON.parse(fs.readFileSync(ProductManager.filePath));

            products.push(product);
            fs.writeFileSync(ProductManager.filePath, JSON.stringify(products));

            ProductManager.quantity++; 
        } catch (error) {
            console.error("Error al crear el producto:", error.message);
        }
    }

    read() {
        try {

            return JSON.parse(fs.readFileSync(ProductManager.filePath));
        } catch (error) {
            console.error("Error al leer los productos:", error.message);
            return [];
        }
    }

    readOne(id) {
        try {
            const products = JSON.parse(fs.readFileSync(ProductManager.filePath));
            const product = products.find(product => product.id === id);

            if (!product) {
                throw new Error("Producto no encontrado.");
            }

            return product;
        } catch (error) {
            console.error("Error al leer el producto:", error.message);
            return null;
        }
    }

    destroy(id) {
        try {
            let products = JSON.parse(fs.readFileSync(ProductManager.filePath));

            const index = products.findIndex(product => product.id === id);

            if (index === -1) {
                throw new Error("Producto no encontrado.");
            }

            const deletedProduct = products.splice(index, 1)[0];

            fs.writeFileSync(ProductManager.filePath, JSON.stringify(products));

            ProductManager.quantity--; 
            return deletedProduct;
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            return null;
        }
    }
}

const productManager = new ProductManager();

productManager.create({ title: "remera", photo: "camisa.jpg", category: "Ropa", price: 20, stock: 50 });
productManager.create({ title: "Pantalón", photo: "pantalon.jpg", category: "Ropa", price: 30, stock: 40 });
productManager.create({ title: "nike huarache", photo: "zapatos.jpg", category: "Calzado", price: 50, stock: 20 });
productManager.create({ title: "Bufanda", photo: "bufanda.jpg", category: "Accesorios", price: 15, stock: 60 });
productManager.create({ title: "Sombrero", photo: "sombrero.jpg", category: "Accesorios", price: 25, stock: 30 });
productManager.create({ title: "Chaqueta de Cuero", photo: "chaqueta.jpg", category: "Ropa", price: 100, stock: 10 });
productManager.create({ title: "Vestido Floral", photo: "vestido.jpg", category: "Ropa", price: 50, stock: 15 });
productManager.create({ title: "Zapatillas Deportivas", photo: "zapatillas.jpg", category: "Calzado", price: 80, stock: 25 });
productManager.create({ title: "medias", photo: "medias.jpg", category: "Accesorios", price: 35, stock: 20 });
productManager.create({ title: "Gorra de Bizarrap", photo: "gorra.jpg", category: "Accesorios", price: 20, stock: 40 });



console.log(productManager.read());

