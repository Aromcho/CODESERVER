import Order from "../models/order.model.js";
import Manager from "../Manager.mongo.js";

const ordersManager = new Manager(Order);
export default ordersManager;