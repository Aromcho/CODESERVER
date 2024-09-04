import productManager from "../DAO/mongo/managers/ProductManager.mongo.js";

class ProductService {
    async createService(data) {
        const createdProduct = await productManager.create(data);
        return createdProduct;
    }

    async readService(filter) {
        const products = await productManager.read(filter);
        return products;
    }

    async paginateService(filter, opts) {
        const paginatedProducts = await productManager.paginate({ filter, opts });
        return paginatedProducts;
    }

    async readOneService(pid) {
        const product = await productManager.readOne(pid);
        return product;
    }

    async updateService(pid, newData) {
        const updatedProduct = await productManager.update(pid, newData);
        return updatedProduct;
    }

    async destroyService(pid) {
        const deletedProduct = await productManager.destroy(pid);
        return deletedProduct;
    }
}

const service = new ProductService();
export const { createService, readService, paginateService, readOneService, updateService, destroyService } = service;
