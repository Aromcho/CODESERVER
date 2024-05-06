import Cart from "./models/cart.model";

class CartManager {
    constructor() {}
    async create(data) {
        try {
            const one = await Cart.create(data)
            return one
        } catch (error) {
            throw error
        }
    }
    async read(cat) {
        try {
            const all = await Cart.read(cat)
            return all
        } catch (error) {
            throw error
        }
    }
}