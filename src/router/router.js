import express from 'express';
import userManager from './data/fs/UserManager.fs.js';
import productManager from './data/fs/ProductManager.fs.js';

const router = express.Router();
const users = userManager;
const products = productManager;

router.get('/', (req, res) => {
    res.status(200).send("API CONECTADA");
});

router.get('/api/users', async (req, res) => {
    try {
        const allUsers = await users.read();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).send("Error al obtener usuarios");
    }
});

router.get('/api/products', async (req, res) => {
    try {
        const allProducts = await products.read();
        res.status(200).json(allProducts);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send("Error al obtener productos");
    }
});

router.use((req, res) => {
    res.status(404).send("RUTA NO ENCONTRADA");
});

export default router;


