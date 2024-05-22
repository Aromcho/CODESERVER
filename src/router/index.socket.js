import productManager from "../data/fs/ProductManager.fs.js";
import usersManager from "../data/fs/userManager.fs.js";

export default async (socket) => {
  console.log("client id: " + socket.id);
  socket.emit("products", await productManager.read());
  socket.on("register", async data =>{ 
    await productManager.create(data)
    socket.emit("products", await productManager.read());
 })

 socket.emit("users", await usersManager.read());
 socket.on("userRegister", async data => {
  await usersManager.create(data)
  socket.emit("users", await usersManager.read())
 } )
};


