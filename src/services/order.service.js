import orderManager from "../DAO/mongo/managers/OrderManager.mongo.js";

class OrderService {
    async createService(data) {
        try {
            const createdOrder = await orderManager.create(data);
            return createdOrder;
        } catch (error) {
            throw error;
        }
    }

    async readService() {
        try {
            const orders = await orderManager.read();
            return orders;
        } catch (error) {
            throw error;
        }
    }

    async readOneService(oid) {
        try {
            const order = await orderManager.readOne(oid);
            return order;
        } catch (error) {
            throw error;
        }
    }

    async updateService(oid, data) {
        try {
            const updatedOrder = await orderManager.update(oid, data);
            return updatedOrder;
        } catch (error) {
            throw error;
        }
    }

    async destroyService(oid) {
        try {
            await orderManager.destroy(oid);
        } catch (error) {
            throw error;
        }
    }
}

const service = new OrderService();
export const { createService, readService, readOneService, updateService, destroyService } = service;
