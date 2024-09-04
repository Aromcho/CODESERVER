import cartsManager from "../DAO/mongo/managers/CartManager.mongo.js";

class CartService {
    async readService(filter = {}) {
        try {
            const all = await cartsManager.read(filter);
            return all;
        } catch (error) {
            throw error;
        }
    }

    async readOneService(nid) {
        try {
            const one = await cartsManager.readOne(nid);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async createService(data) {
        try {
            const one = await cartsManager.create(data);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async updateService(nid, data) {
        try {
            const one = await cartsManager.update(nid, data);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async destroyService(nid) {
        try {
            const one = await cartsManager.destroy(nid);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async destroyAllService(nid) {
        try {
            const all = await cartsManager.read({ nid });
            if (all.length > 0) {
                for (const item of all) {
                    await cartsManager.destroy(item._id);
                }
                return "All items deleted";
            } else {
                throw new Error("No items found to delete");
            }
        } catch (error) {
            throw error;
        }
    }
}

const service = new CartService();
export const { readService, readOneService, createService, updateService, destroyService, destroyAllService } = service;
