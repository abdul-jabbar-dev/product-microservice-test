import { Router } from "express";
import ORDER from "../controllers/order";
import zod from "../middlewares/validation/zod";
import createOrder from "../validators/createOrder";

const route = Router();
route.get("/", (req, res) => { 
  res.send("Order Service running on http://localhost:4002");
});

route.get("/orders", ORDER.getOrders);
route.get("/orders/:id", ORDER.getOrder);
route.post("/create-order", zod(createOrder()), ORDER.createNewOrder);

export default route;
