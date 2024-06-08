import {Router, response} from 'express';
import  cartsManager from '../../data/mongo/managers/CartManager.mongo.js';
import { Types } from 'mongoose';

const ticketsRouter = Router();

// Definir las rutas
ticketsRouter.get('/:uid', read);
//cticketsRouter.get('/:tid', readOne);
//cticketsRouter.post('/', create);
//cticketsRouter.put('/:tid', update);
//cticketsRouter.delete('/:tid', destroy);

// Implementar las funciones de manejo de rutas
async function read(req, res) {
  try {
    const { uid } = req.params;
    const tickets = await cartsManager.aggregate([
      {
        $match: {
          user_id: new Types.ObjectId(uid),
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
      },{
        $set: {
            subtotal: { $multiply: ["$quantity","$price"] },
        }
      },{
        $group: {
            _id: "$user_id",
            total: { $sum: "$subtotal" },
            price: { $first: "$price" },
            quantity: { $first: "$quantity" },
            state: { $first: "$state" },
            subtotal: { $first: "$subtotal" },
        
      }
    },{
        $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
        }
    },{
        $merge: {
            into: "tickets",
            
        }
    }

    ]);
     return res.json({
        status: 201,
        response: tickets
      });
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
}

export default ticketsRouter;