import { Router } from 'express';
import cartsManager from '../../data/mongo/managers/CartManager.mongo.js';
import { Types } from 'mongoose';

const ticketsRouter = Router();

ticketsRouter.get("/:nid", aggregateCart);







async function aggregateCart(req, res, next) {
    try {
      const { nid } = req.params;
      const uid = new Types.ObjectId(nid); // Asegurándose de que el nid es un ObjectId válido para MongoDB
      const aggregationPipeline = [
        {
          $match: {
            user_id: uid,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },
        {
          $set: {
            subtotal: { $multiply: ["$quantity", "$price"] },
          },
        },
        {
          $group: {
            _id: "$user_id",
            total: { $sum: "$subtotal" },
            price: { $first: "$price" },
            quantity: { $first: "$quantity" },
            state: { $first: "$state" },
            subtotal: { $first: "$subtotal" },
          },
        },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
          },
        },
      ];
      const result = await cartsManager.aggregate(aggregationPipeline);
      return res.json({
        statusCode: 200,
        response: result,
      });
    } catch (error) {
      return next(error);
    }
  }
  export default ticketsRouter;