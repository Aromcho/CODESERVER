import cartsManager from "../DAO/mongo/managers/CartManager.mongo.js";

class TicketService {
    async createService(data) {
        try {
            const result = await cartsManager.aggregate(aggregationPipeline);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
const service = new TicketService();
export const { createService  } = service;