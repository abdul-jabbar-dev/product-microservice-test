import express from "express";
import mongoose from "mongoose"; 
import route from "./routes/routes";
import ENV from "./config";

const app = express();
app.use(express.json());

mongoose.connect(ENV.MONGODB_URI);
app.use(route);

app.listen(4002, () => {
  console.log("Order Service running on http://localhost:4002");
});
