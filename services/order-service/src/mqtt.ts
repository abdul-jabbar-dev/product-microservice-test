import mqtt from "mqtt";
import ENV from "./config";

const options = {
  host: ENV.MQTT.HOST,
  port: ENV.MQTT.PORT,
  protocol: ENV.MQTT.PROTOCOL as "mqtts",
  username: ENV.MQTT.USERNAME,
  password: ENV.MQTT.PASSWORD,
  clientId: `client-${Math.random().toString(16).slice(2, 8)}`,
}; 
const client = mqtt.connect(options);

client.on("connect", (e) => {
  console.log("Connected to HiveMQ Cloud");
 
});

client.on("error", (error) => {
  console.error("MQTT Connection Error:", error);
});

client.on("offline", () => {
  console.warn("MQTT Client is offline");
});

client.on("close", () => {
  console.warn("MQTT Client connection closed");
});

client.on("message", (topic, message) => {
  console.log("Received message:", topic, message.toString());
});

export default client;
