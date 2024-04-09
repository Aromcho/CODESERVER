import express from "express";
import productManager from "./src/data/fs/ProductManager.fs.js";
import userManager from "./src/data/fs/UserManager.fs.js";




const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

// Middlewares 
server.use(express.urlencoded({ extended: true }));
server.use(express.json())
// product ruter

server.get("/api/product", async (req, res) => {
    try {
        const { category } = req.query
        const all = await productManager.read(category)
        if (all.length !== 0) {
            return res.status(200).json({
                response: all,
                category,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})
server.get("/api/product/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const one = await productManager.readOne(pid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})
server.post("/api/product", async (req, res) => {
    try {
        const productData = req.body;
        await productManager.create(productData);
        return res.status(201).json({
            response: "Producto creado exitosamente",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "Error al crear el producto",
            success: false
        });
    }
});
server.put("/api/product/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const newData = req.body;

        // Actualizar el producto
        const updatedProduct = await productManager.update(pid, newData);
        if (!updatedProduct) {
            const error = new Error("Error al actualizar el producto.");
            error.statusCode = 500;
            throw error;
        }

        return res.status(200).json({
            response: updatedProduct,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            response: error.message || "Error interno del servidor",
            success: false
        });
    }
});
server.delete("/api/product/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        
        // Llamar al método destroy de productManager para eliminar el producto
        const deletedProduct = await productManager.destroy(pid);

        if (deletedProduct) {
            return res.status(200).json({
                response: "Producto eliminado exitosamente",
                success: true
            });
        } else {
            const error = new Error("Producto no encontrado");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        console.error(error);
        return res.status(error.statusCode || 500).json({
            response: error.message || "Error al eliminar el producto",
            success: false
        });
    }
});



// user router

server.get("/api/user", async (req, res) => {
    try {
        const { category } = req.query
        const all = await userManager.read(category)
        if (all.length !== 0) {
            return res.status(200).json({
                response: all,
                category,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})
server.get("/api/user/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const one = await userManager.readOne(uid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})
