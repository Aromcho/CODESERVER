import productManager from "../data/fs/ProductManager.fs.js";


export default async (socket) => {
  console.log("client id: " + socket.id);
  socket.emit("products", await productManager.read());
  socket.on("register", async data =>{ 
    await productManager.create(data)
    socket.emit("products", await productManager.read());
})
};