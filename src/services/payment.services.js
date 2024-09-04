import { createPaymentRepository } from "../repository/payment.repository.js";

const createPaymentService = async (user_id) => {
  try {
    const session = await createPaymentRepository(user_id);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export { createPaymentService };
