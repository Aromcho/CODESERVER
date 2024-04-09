import fs from "fs";
import crypto from "crypto";

class ProductManager {
    constructor() {
        this.path = "./src/data/fs/files/product.json"
        this.init();
    }

    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([],null,2);
            fs.writeFileSync(this.path, stringData);
            console.log("Created File")
        } else {
            console.log("File Exist");
        }
    }

    async create(data) {
        const product = {
            id: crypto.randomBytes(12).toString("hex"), 
            title: data.title || "Sin título",
            photo: data.photo || "default.jpg",
            category: data.category || "Sin categoría",
            price: data.price || 0,
            stock: data.stock || 0,
            descrption: data.descrption || "sin descripcion"
        };

        try {
            if (!product.title || !product.price) {
                throw new Error("Faltan propiedades obligatorias para crear el producto (email y/o contraseña).");
            }
            const products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            products.push(product);
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error("Error al crear el usuario:", error.message);
        }
    }

    
    async read(cat) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            cat && (all = all.filter((each) => each.category === cat));
        return all;
    
        } catch (error) {
            console.error("Error al leer los usuarios:", error.message);
                return [];
        }
    }
    

    readOne(id) {
        try {
            const products = JSON.parse(fs.readFileSync(this.path));
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
    async update(id, newData) {
        try {
            let products = JSON.parse(fs.readFileSync(this.path));
    
            const index = products.findIndex(product => product.id === id);
    
            if (index === -1) {
                throw new Error("Producto no encontrado.");
            }
            newData.id = id;
            products[index] = newData;
    
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    
            return newData;
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            return null;
        }
    }
    
    async destroy(id) {
        try {
            let products = JSON.parse(fs.readFileSync(this.path));
    
            const index = products.findIndex(product => product.id === id);
    
            if (index === -1) {
                throw new Error("Producto no encontrado.");
            }
    
            const deletedProduct = products.splice(index, 1)[0];
    
            await fs.promises.writeFile(this.path, JSON.stringify(products));
    
            return deletedProduct;
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            return null;
        }
    }
    
}

const productManager = new ProductManager();

//productManager.create({ title: "remera", photo: "camisa.jpg", category: "Ropa", price: 20, stock: 50 });
//productManager.create({ title: "Pantalón", photo: "pantalon.jpg", category: "Ropa", price: 30, stock: 40 });
//productManager.create({ title: "nike huarache", photo: "zapatos.jpg", category: "Calzado", price: 50, stock: 20 });
//productManager.create({ title: "Bufanda", photo: "bufanda.jpg", category: "Accesorios", price: 15, stock: 60 });
//productManager.create({ title: "Sombrero", photo: "sombrero.jpg", category: "Accesorios", price: 25, stock: 30 });
//productManager.create({ title: "Chaqueta de Cuero", photo: "chaqueta.jpg", category: "Ropa", price: 100, stock: 10 });
//productManager.create({ title: "Vestido Floral", photo: "vestido.jpg", category: "Ropa", price: 50, stock: 15 });
//productManager.create({ title: "Zapatillas Deportivas", photo: "zapatillas.jpg", category: "Calzado", price: 80, stock: 25 });
//productManager.create({ title: "medias", photo: "medias.jpg", category: "Accesorios", price: 35, stock: 20 });
//productManager.create({ title: "Gorra de Bizarrap", photo: "gorra.jpg", category: "Accesorios", price: 20, stock: 40 });



console.log(productManager.read());
export default productManager;