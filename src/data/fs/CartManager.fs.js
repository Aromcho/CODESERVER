import fs from "fs";
import crypto from "crypto";

class CartManager {
    constructor() {
        this.path = "./src/data/fs/files/cart.json"
        this.init();
    }

    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const initialData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, initialData);
            console.log("Cart file created successfully.");
        } else {
            console.log("Cart file already exists.");
        }
    }

    async create(data) {
        try {
            const cartItem = {
                id: crypto.randomUUID(), // Generar un id único
                user_id: data.user_id || "", // Id del usuario que agrega el producto al carrito
                product_id: data.product_id || "", // Utiliza el product_id proporcionado en los datos
                quantity: data.quantity || 1, // Cantidad predeterminada: 1
                state: data.state || "reserved" // Estado predeterminado: "reserved"
            };
            

            const cartItems = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            cartItems.push(cartItem);
            fs.writeFileSync(this.path, JSON.stringify(cartItems, null, 2));

            console.log("Producto añadido al carrito:", cartItem);
            return cartItem;
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error.message);
            return null;
        }
    }

    async read() {
        try {
            const all = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(all);
        } catch (error) {
            console.error("Error al leer los elementos del carrito:", error.message);
            return [];
        }
    }

    readOne(id) {
        try {
            const cart = JSON.parse(fs.readFileSync(this.path));
            const cartItem = cart.find(item => item.id === id);

            if (!cartItem) {
                throw new Error("Elemento del carrito no encontrado.");
            }
            return cartItem;
        } catch (error) {
            console.error("Error al leer el elemento del carrito:", error.message);
            return null;
        }
    }

    async update(id, newData) {
        try {
            let cart = JSON.parse(fs.readFileSync(this.path));

            const index = cart.findIndex(item => item.id === id);

            if (index === -1) {
                throw new Error("Elemento del carrito no encontrado.");
            }

            // Actualizar el elemento del carrito con los nuevos datos
            newData.id = id;
            cart[index] = newData;

            fs.writeFileSync(this.path, JSON.stringify(cart, null, 2));

            return newData;
        } catch (error) {
            console.error("Error al actualizar el elemento del carrito:", error.message);
            return null;
        }
    }

    async destroy(id) {
        try {
            let cart = JSON.parse(fs.readFileSync(this.path));

            const index = cart.findIndex(item => item.id === id);

            if (index === -1) {
                throw new Error("Elemento del carrito no encontrado.");
            }

            const deletedItem = cart.splice(index, 1)[0];

            await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2));

            return deletedItem;
        } catch (error) {
            console.error("Error al eliminar el elemento del carrito:", error.message);
            return null;
        }
    }
}

const cartManager = new CartManager();
console.log(cartManager.read());
export default cartManager;
