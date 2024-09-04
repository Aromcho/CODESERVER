class CartManager {
    constructor() {
        this.cartItems = [];
    }

    async create(data) {
        try {
            const cartItem = {
                id: crypto.randomBytes(12).toString("hex"),
                user_id: data.user_id || "", // Id del usuario que agrega el producto al carrito
                product_id: data.product_id || "", // Id del producto que se agrega al carrito
                quantity: data.quantity || 1, // Cantidad predeterminada: 1
                state: data.state || "reserved" // Estado predeterminado: "reserved"
            };

            this.cartItems.push(cartItem);

            console.log("Producto añadido al carrito:", cartItem);
            return cartItem;
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error.message);
            return null;
        }
    }

    async read(cat) {
        try {
            let all = this.cartItems;
            if (cat) {
                all = all.filter((item) => item.category === cat);
            }
            return all;
        } catch (error) {
            console.error("Error al leer los elementos del carrito:", error.message);
            return [];
        }
    }

    readOne(id) {
        try {
            const cartItem = this.cartItems.find(item => item.id === id);

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
            const index = this.cartItems.findIndex(item => item.id === id);

            if (index === -1) {
                throw new Error("Elemento del carrito no encontrado.");
            }

            // Actualizar el elemento del carrito con los nuevos datos
            newData.id = id;
            this.cartItems[index] = newData;

            return newData;
        } catch (error) {
            console.error("Error al actualizar el elemento del carrito:", error.message);
            return null;
        }
    }

    async destroy(id) {
        try {
            const index = this.cartItems.findIndex(item => item.id === id);

            if (index === -1) {
                throw new Error("Elemento del carrito no encontrado.");
            }

            const deletedItem = this.cartItems.splice(index, 1)[0];

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
