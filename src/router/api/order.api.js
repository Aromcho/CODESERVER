import { Router } from "express";
import orderManager from "../../data/mongo/managers/OrderManager.mongo.js";

const orderRouter = Router();

orderRouter.get('/', read);
orderRouter.get('/:oid', readOne);
orderRouter.post('/', create);
orderRouter.put('/:oid', update);
orderRouter.delete('/:oid', destroy);

async function create(req, res, next) {
    try {
        const data = req.body;
        const createdOrder = await orderManager.create(data);
        return res.status(201).json({
            message: 'Order created successfully',
            order: createdOrder,
        });
    } catch (error) {
        next(error);
        
    }
}
async function read(req, res, next) {
    try {
        const orders = await orderManager.read();
        if(orders.length > 0){
            return res.status(200).json(orders)
        } else {
            const error = new Error('Orders not found');
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error)
    }
}
async function readOne(req, res, next) {
    try {
        const { oid } = req.params;
        const order = await orderManager.readOne(oid);
        if(order){
            return res.status(200).json(order)
        } else {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error)
    }
}

async function update(req, res, next) {
    try {
        const { oid } = req.params;
        const data = req.body;
        const updatedOrder = await orderManager.update(oid, data);
        return res.status(200).json({
            message: 'Order updated successfully',
            order: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
}
async function destroy(req, res, next) {
    try {
        const { oid } = req.params;
        await orderManager.destroy(oid);
        return res.status(200).json({
            message: 'Order deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}
 export default orderRouter;