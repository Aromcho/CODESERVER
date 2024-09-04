import cartsManager from "../DAO/mongo/managers/CartManager.mongo.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentRepository = async (user_id) => {
    try {
        // Obtén los productos en el carrito del usuario
        let productsOnCarts = await cartsManager.read({ user_id });

        // Mapea los productos del carrito al formato requerido por Stripe
        const line_items = productsOnCarts.map((product) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.title,
                    },
                    unit_amount: product.price * 100, // El precio debe estar en centavos
                },
                quantity: product.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: "http://localhost:8080/success",
            cancel_url: "http://localhost:8080/cancel",
        });

        return session;
    } catch (error) {
        throw error;
    }
};

export { createPaymentRepository };
