const ENV = {
  PRODUCT_SERVICE: "http://localhost:4001",
  ORDER_SERVICE: "http://localhost:4002",
  PORT: 50051,
  JWT_SECRET: "secret",
  SOLT_ROUNDS: 8,
  MONGODB_URI:
    "mongodb+srv://admin:Devdeveloper39@cluster0.0vkea.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0",
  MQTT: {
    HOST: "aa29f7e027ae46b99652bf4ce450e746.s1.eu.hivemq.cloud",
    PORT: 8883,
    PROTOCOL: "mqtts",
    USERNAME: "broker",
    PASSWORD: "Broker39",
  },
  REDIS: {
    USERNAME: "default",
    PASSWORD: "iE5X4WJuqcp3RBKSPyyLjRoUrgmz1yMY",
    SOCKET: {
      HOST: "redis-10326.c15.us-east-1-4.ec2.redns.redis-cloud.com",
      PORT: 10326,
    },
  },
};
export default ENV;
