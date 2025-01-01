import express from "express";
import mongoose from "mongoose";
import router from "./router";
import ENV from "./config";
import redisClient from "./lib/redis";

const app = express();
app.use(express.json());

mongoose.connect(ENV.MONGODB_URI);
(async () => {
  await redisClient.connect();
})();


app.use("/api/users", router);

const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
});
