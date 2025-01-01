import express, { Application } from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import env from "./env";

const startServer = async () => {
  try {
    const app: Application = express();

    // Connect to MongoDB
    await mongoose.connect(env.MONGO_URI, {
      autoIndex: true,
    });

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    app.get("/", (req, res) => {
      res.send("Product Service is running");
    });

    app.get("/health", (req, res) => {
      res.send("Product Service is healthy");
    });

    // Start Apollo Server
    await server.start();
    console.log("Apollo Server started");
    // Apply Apollo middleware to Express
    server.applyMiddleware({ app: app as any });
    console.log("Apollo middleware applied");
    // Start the Express server
    app.listen(4001, () => {
      console.log("Product Service running on http://localhost:4001/graphql");
    });
  } catch (error) {
    console.log(error);
  }
};

// Start the server
startServer().catch((error) => {
  console.error("Failed to start the server:", error);
});
