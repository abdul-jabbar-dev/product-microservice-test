export default {
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb+srv://admin:Devdeveloper39@cluster0.0vkea.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0",
  SOLT_ROUND: process.env.SOLT_ROUND || 10,
};
