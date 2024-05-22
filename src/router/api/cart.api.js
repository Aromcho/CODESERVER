import express from "express";
import cartManager from "../../data/mongo/managers/CartManager.mongo.js";

const cartRouter = express.Router();

// Ruta para obtener todos los elementos del carrito
cartRouter.get("/", async (req, res) => {
    try {
        const cartItems = await cartManager.read();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para agregar un nuevo elemento al carrito
cartRouter.post("/", async (req, res) => {
    try {
        const cartItemData = req.body;
        const newCartItem = await cartManager.create(cartItemData);
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para agregar un producto al carrito por su ID
cartRouter.post("/add-to-cart/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        // Aquí podrías obtener el user_id del usuario que está realizando la solicitud,
        // por ejemplo, si está autenticado, a través de req.user.id
        const user_id = "user_id_del_usuario"; // Reemplaza esto con el user_id real
        const cartItemData = {
            user_id,
            product_id: productId,
            quantity: 1, // Puedes ajustar la cantidad según la solicitud
            state: "reserved" // Estado predeterminado: "reserved"
        };
        const newCartItem = await cartManager.create(cartItemData);
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener un elemento específico del carrito por su ID
cartRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await cartManager.readOne(id);
        if (cartItem) {
            res.json(cartItem);
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

export default cartRouter;
