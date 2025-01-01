import { createClient } from "redis";
import ENV from "../../config/ENV";
const redisClient = createClient({
  username: ENV.REDIS.USERNAME,
  password: ENV.REDIS.PASSWORD,
  socket: {
    host: ENV.REDIS.SOCKET.HOST,
    port: ENV.REDIS.SOCKET.PORT,
  },
});
(async () => {
  redisClient.on("connect", (err) => console.log("successfully connect redis"));
  redisClient.on("error", (err) => console.error("Redis Client Error", err));
})();

export default redisClient;
