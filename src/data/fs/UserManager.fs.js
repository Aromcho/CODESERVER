import fs from "fs";
import crypto from "crypto";

class UsersManager {
    constructor() {
        this.path = "./src/data/fs/files/users.json";
        this.init();
    }

    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
            console.log("Archivo creado");
        } else {
            console.log("El archivo ya existe");
        }
    }

    async create(data) {
    try {
        if(!data.email || !data.password) {
            throw new Error("Ingese EMAIL/PASSWORD");
        } else {
            const one = {
                id: crypto.randomBytes(12).toString("hex"),
                email: data.email,
                password: data.password,
                role: data.role || 0,
                photo: data.photo || "",
                age: data.age || 12,
            };
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            all.push(one);
            all = JSON.stringify(all, null, 2);
            await fs.promises.writeFile(this.path, all);
            return one;
        
        }
    } catch (error) {
        throw error;
    }
    }

    async read(role) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            role && (all = all.filter((each) => each.role === role));
            return all;

        } catch (error) {
            console.error("Error al leer los usuarios:", error.message);
            return [];
        }
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let user = all.find((each) => each.id === id);
            return user;
        } catch (error) {
            console.error("Error al leer el usuario:", error.message);
            return null;
        }
    }

    async update(id, data) {
        try {
            let all = await this.read()
            let one = all.find(each=>each)
            if (one) {
                for(let prop in data){
                    one[prop] = data[prop];
                }
            }
            all = JSON.stringify(all, null, 2)
            await fs.promises.writeFile(this.path, all);
            return one;
        } catch (error) {
          throw error;    
        }
    }


    destroy(email) {
        try {
            let users = JSON.parse(fs.readFileSync(this.path));
            const initialLength = users.length;
            users = users.filter(user => user.email !== email);
            if (users.length === initialLength) {
                throw new Error(`No se encontró ningún usuario con el correo electrónico '${email}'.`);
            }
            fs.writeFileSync(this.path, JSON.stringify(users, null, 2));
            console.log(`Usuario con el correo electrónico '${email}' eliminado correctamente.`);
        } catch (error) {
            console.error("Error al eliminar el usuario:", error.message);
        }
    }
}
const userManager = new UsersManager();

//userManager.create({ photo: "user1.jpg", email: "usuario1@example.com", password: "123456", role: "admin", photo: "",age: "" });
//userManager.create({ photo: "user2.jpg", email: "usuario2@example.com", password: "password123", role: "user", photo: "",age: ""});
//userManager.create({ photo: "", email: "usuario3@example.com", password: "abc123", role: "user", photo: "",age: "" });
//userManager.create({ email: "usuario4@example.com", password: "26398322", role: "user", photo: "",age: "" });

export default userManager;


