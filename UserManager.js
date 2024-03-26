const fs = require("fs");

class UsersManager {
    static quantity = 0;
    static #users = [];
    static filePath = "./users.json";

    constructor() {
        if (!fs.existsSync(UsersManager.filePath)) {
            fs.writeFileSync(UsersManager.filePath, JSON.stringify([]));
        }
    }

    createUser(data) {
        const user = {
            id: (Math.random() * Math.pow(16, 12)).toString(16), 
            photo: data.photo || "",
            email: data.email || "",
            password: data.password || "",
            role: data.role || ""
        };

        try {
            if (!user.email || !user.password) {
                throw new Error("Faltan propiedades obligatorias para crear el usuario (email y/o contraseña).");
            }
            const users = JSON.parse(fs.readFileSync(UsersManager.filePath));
            users.push(user);
            fs.writeFileSync(UsersManager.filePath, JSON.stringify(users));

            UsersManager.quantity++; 
        } catch (error) {
            console.error("Error al crear el usuario:", error.message);
        }
    }

    readUsers() {
        try {

            return JSON.parse(fs.readFileSync(UsersManager.filePath));
        } catch (error) {
            console.error("Error al leer los usuarios:", error.message);
            return [];
        }
    }
}


const usersManager = new UsersManager();

usersManager.createUser({ photo: "user1.jpg", email: "usuario1@example.com", password: "123456", role: "admin" });
usersManager.createUser({ photo: "user2.jpg", email: "usuario2@example.com", password: "password123", role: "user" });
usersManager.createUser({ photo: "", email: "usuario3@example.com", password: "abc123", role: "user" });
usersManager.createUser({ email: "usuario4@example.com", password: "26398322", role: "user" });

console.log(usersManager.readUsers());

