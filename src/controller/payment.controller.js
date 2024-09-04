import { createPaymentService } from "../services/payment.services.js";

const createPayment = async (req, res, next) => {
    try {
        const user_id = req.body._id || req.user._id; // Asegúrate de obtener el `user_id` correctamente
        const response = await createPaymentService(user_id);
        return res.response201(response);
    } catch (error) {
        return next(error);
    } 
};

export { createPayment };
