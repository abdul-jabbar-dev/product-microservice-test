import { RequestHandler } from "express";
import mongoose from "mongoose";
import Order from "../models/Order";
import graph from "../api";
import client from "../mqtt";
import Topic from "../broker/const";

const createNewOrder: RequestHandler = async (req, res) => {
  try {
    const order = req.body;
    const resp = await graph.CreateOrderGQL(order);
    if (!resp.createOrder._id) {
      throw new Error("Error creating order");
    }

    client.publish(
      Topic.ORDER.CREATED.title,
      Topic.ORDER.CREATED.fn(resp.createOrder._id, resp.createOrder),
      { qos: 1 },
      (error) => {
        if (error) {
          console.error("MQTT Publish Error:", error);
        } else {
          console.log("Order event published successfully to MQTT.");
        }
      }
    );

    res.status(201).json(resp);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrder: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid order ID" });
    }

    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const ORDER = { getOrders, getOrder, createNewOrder };
export default ORDER;
