class ProductManagerMemory {
    constructor() {
        this.products = [];
    }

    async create(data) {
        try {
            const product = {
                id: Math.random().toString(36).substr(2, 9), // Generar ID aleatorio
                title: data.title || "Sin título",
                photo: data.photo || "default.jpg",
                category: data.category || "Sin categoría",
                price: data.price || 0,
                stock: data.stock || 0,
                description: data.description || "sin descripción"
            };

            this.products.push(product);
            return product;
        } catch (error) {
            console.error("Error al crear el producto:", error.message);
            throw error;
        }
    }

    async read(category) {
        try {
            let all = [...this.products];
            category && (all = all.filter((each) => each.category === category));
            return all;
        } catch (error) {
            console.error("Error al leer los productos:", error.message);
            return [];
        }
    }

    async readOne(id) {
        try {
            const product = this.products.find((each) => each.id === id);
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
            const index = this.products.findIndex((product) => product.id === id);
            if (index === -1) {
                throw new Error("Producto no encontrado.");
            }
            newData.id = id;
            this.products[index] = newData;
            return newData;
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }

    async destroy(id) {
        try {
            const index = this.products.findIndex((product) => product.id === id);
            if (index === -1) {
                throw new Error("Producto no encontrado.");
            }
            const deletedProduct = this.products.splice(index, 1)[0];
            return deletedProduct;
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            throw error;
        }
    }
}

const productManagerMemory = new ProductManagerMemory();

export default productManagerMemory;
