import { EventEmitter } from "events";

// Create a global event emitter for notifications
const notificationEmitter = new EventEmitter();

export default notificationEmitter;
