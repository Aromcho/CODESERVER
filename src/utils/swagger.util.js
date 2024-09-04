import path from "path";
import __dirname from "../../utils.js";

const options = {
  definition: {
    openapi: "3.0.0", // Asegúrate de que la versión sea correcta
    info: {
      title: "API Documentation",
      description: "Documentation for the API endpoints",
      version: "1.0.0"
    },
  },
  apis: [
    path.join(__dirname, "/src/docs/Cart/Cart.yaml"),
    path.join(__dirname, "/src/docs/Order/Order.yaml"),
    path.join(__dirname, "/src/docs/Product/Product.yaml"),
    path.join(__dirname, "/src/docs/Sessions/Sessions.yaml"),
    path.join(__dirname, "/src/docs/Ticket/Ticket.yaml"),
    path.join(__dirname, "/src/docs/User/User.yaml"),
  ],
};

export default options;
