import { Response } from "express";
import notificationEmitter from "./eventEmitter";

export const sendNotification = (res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send a "connected" message to confirm SSE connection
  res.write("data: Connected to notification stream\n\n");

  // Listener for new notifications
  const onNotification = (event: any) => {
    const eventData = JSON.stringify(event);
    res.write(`data: ${eventData}\n\n`);
  };

  // Attach the listener to the notification emitter
  notificationEmitter.on("notification", onNotification);

  // Remove listener when connection is closed
  res.on("close", () => {
    notificationEmitter.removeListener("notification", onNotification);
    res.end();
  });
};
