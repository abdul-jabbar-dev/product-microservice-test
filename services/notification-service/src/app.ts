import express from "express";
import { sendNotification } from "./notificationController";
import notificationEmitter from "./eventEmitter";
import mqtt from "mqtt";
import ENV from "./config/ENV";
import Topic from "./broker/const";

const app = express();

const options = {
  host: ENV.MQTT.HOST,
  port: ENV.MQTT.PORT,
  protocol: ENV.MQTT.PROTOCOL as "mqtts",
  username: ENV.MQTT.USERNAME,
  password: ENV.MQTT.PASSWORD,
  clientId: `client-${Math.random().toString(16).slice(2, 8)}`,
};

const mqttClient = mqtt.connect(options);

mqttClient.subscribe(Topic.ORDER.CREATED, (err) => {
  console.log("Subscribed to " + Topic.ORDER.CREATED);
});

// Handle incoming MQTT messages
mqttClient.on("message", (topic, message) => {
  if (topic === Topic.ORDER.CREATED) {
    const orderEvent = JSON.parse(message.toString());
    console.log("Received Order Created Event:", orderEvent);

    // Emit the event to SSE clients
    notificationEmitter.emit("notification", {
      type: Topic.ORDER.CREATED,
      message: `Order ${orderEvent.orderId} has been created.`,
      timestamp: new Date().toISOString(),
      details: orderEvent,
    });
  }
});

// SSE Endpoint
app.get("/notifications", (req, res) => {
  sendNotification(res);
});

// Start the server
app.listen(ENV.PORT, () => {
  console.log(`Notification Service running on http://localhost:${ENV.PORT}`);
});
