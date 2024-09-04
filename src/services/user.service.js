import userManager from "../DAO/mongo/managers/UserManager.mongo.js";

class UserService {
    async createService(data) {
        try {
            const one = await userManager.create(data);
            return one;
        } catch (error) {
            throw error;
        }
    }
    async readService(role) {
        try {
            const all = await userManager.read(role);
            return all;
        } catch (error) {
            throw error;
        }
    }
    async readOneService(uid) {
        try {
            const one = await userManager.readOne(uid);
            return one;
        } catch (error) {
            throw error;
        }
    }
    async updateService(uid, data) {
        try {
            const one = await userManager.update(uid, data);
            return one;
        } catch (error) {
            throw error;
        }
    }
    async destroyService(uid) {
        try {
            const one = await userManager.destroy(uid);
            return one;
        } catch (error) {
            throw error;
        }
    }
}
const service = new UserService();
export const { createService, readService, readOneService, updateService, destroyService  }= service;
