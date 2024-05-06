// Importa express
import express from "express";
// Importa cartManager
import cartManager from "../../data/fs/CartManager.fs.js";

// Crea un nuevo enrutador de Express
const cartRouter = express.Router();

// Ruta para mostrar la página principal y el contenido del carrito
cartRouter.get("/", async (req, res) => {
    try {
        // Obtiene los datos del carrito
        const cartItem = await cartManager.read();
        // Renderiza la plantilla 'main' y pasa los datos del carrito como contexto
        res.render("main", { cartItem });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ error: error.message });
    }
});

// Ruta para agregar un nuevo elemento al carrito
cartRouter.post("/", async (req, res) => {
    try {
        // Obtiene los datos del nuevo elemento del carrito desde el cuerpo de la solicitud
        const cartItemData = req.body;
        // Crea un nuevo elemento en el carrito
        const newCartItem = await cartManager.create(cartItemData);
        // Devuelve el nuevo elemento del carrito como respuesta
        res.status(201).json(newCartItem);
    } catch (error) {
        // Manejo de errores
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener un elemento específico del carrito por su ID
cartRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await cartManager.readOne(id);
        if (cartItem) {
            res.render("cart", { cartItem });
        } else {
            res.status(404).json({ message: "Elemento del carrito no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para actualizar un elemento específico del carrito por su ID
cartRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updatedCartItem = await cartManager.update(id, newData);
        if (updatedCartItem) {
            res.json(updatedCartItem);
        } else {
            res.status(404).json({ message: "Elemento del carrito no encontrado." });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para eliminar un elemento específico del carrito por su ID
cartRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCartItem = await cartManager.destroy(id);
        if (deletedCartItem) {
            res.json(deletedCartItem);
        } else {
            res.status(404).json({ message: "Elemento del carrito no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Exporta el enrutador
export default cartRouter;
