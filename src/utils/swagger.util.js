import __dirname from "../../utils.js";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "ADOPT ME API",
      description: "Documentation of Adopt me API",
      version: "1.0.0"
    },
  },
  apis: [
    __dirname + "/src/docs/Cart/Cart.yaml",
    __dirname + "/src/docs/Order/Order.yaml",
    __dirname + "/src/docs/Product/Product.yaml",
    __dirname + "/src/docs/Sessions/Sessions.yaml",
    __dirname + "/src/docs/Ticket/Ticket.yaml",
    __dirname + "/src/docs/User/User.yaml",

  ],
};

export default options;
