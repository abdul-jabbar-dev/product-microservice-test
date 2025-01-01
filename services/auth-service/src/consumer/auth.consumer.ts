import redisTopic from "../lib/redis/redisTopic";
import authService from "../services/auth.service";
import redisClient from "./../lib/redis/index";
(async () => {
  // await redisClient.subscribe(
  //   redisTopic.registerUser,
  //   authService.consumer.registerUser
  // );
})();
