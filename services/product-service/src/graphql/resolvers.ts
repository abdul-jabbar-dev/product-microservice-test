import mongoose from "mongoose";
import Category from "../models/Category";
import Order from "../models/Order";
import Product from "../models/Product";
import Review from "../models/Review";
import User from "../models/User";
import auth from "../utils/auth";

const resolvers = {
  Product: {
    category: async ({ categoryId }: any) => {
      return await Category.findById(categoryId);
    },
    reviews: async (parent: any) => {
      return await Review.find({ productId: parent._id });
    },
  },

  Review: {
    product: async (parent: any) => {
      return await Product.findById(parent.productId);
    },
    user: async (parent: any) => {
      return await User.findById(parent.userId);
    },
  },

  Category: {
    products: async ({ _id }: any) => {
      return await Product.find({ category: _id });
    },
  },

  Order: {
    products: async ({ _id, products }: any) => {
      const populatedOrder = await Order.findById(_id).populate({
        path: "products.productId",
        model: "Product",
      });

      return (populatedOrder as any).products.map((orderProduct: any) => ({
        product: orderProduct.productId,
        quantity: orderProduct.quantity,
      }));
    },
    user: async ({ user }: any) => {
      return await User.findById(user);
    },
  },

  Query: {
    products: async () => await Product.find(),
    product: async (_: any, { id }: { id: string }) =>
      await Product.findById(id),

    users: async () => await User.find(),
    user: async (_: any, { id }: { id: string }) => await User.findById(id),

    orders: async (_: any, { user }: { user: string }) => {
      return await Order.find({ user });
    },
    categories: async () => await Category.find(),
    reviews: async (_: any, { productId }: { productId: string }) => {
      return await Review.find({ productId });
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      {
        name,
        email,
        password,
      }: { name: string; email: string; password: string }
    ) => {
      try {
        const hashedPassword = await auth.hashedPassword(password);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });
        return user;
      } catch (error: any) {
        if (error.code === 11000) {
          throw new Error("Email already exists");
        }
        throw error;
      }
    },
    createCategory: async (_: any, { title }: { title: string }) => {
      try {
        const category = await Category.create({ title });
        if (category) {
          
        }
        return category;
      } catch (error: any) {
        if (error.code === 11000) {
          throw new Error("Category already exists");
        }
        throw error;
      }
    },

    createProduct: async (
      _: any,
      {
        productData: { name, price, stock, category, description },
      }: {
        productData: {
          name: string;
          price: number;
          stock: number;
          description: string;
          category: mongoose.Schema.Types.ObjectId;
        };
      }
    ) => {
      try {
        const product = await Product.create({
          name,
          price,
          stock,
          category,
          description,
        });
        return product;
      } catch (error: any) {
        console.error("Error creating product:", error);

        // Check for specific error codes
        if (error.code === 11000) {
          throw new Error("Product already exists");
        }

        // Generic fallback error
        throw error;
      }
    },

    createOrder: async (
      _: any,
      {
        orderData,
      }: {
        orderData: {
          products: {
            productId: mongoose.Schema.Types.ObjectId;
            quantity: number;
          }[];
          user: mongoose.Schema.Types.ObjectId;
        };
      }
    ) => {
      try {
        if (orderData.products.some((p) => p.quantity <= 0)) {
          throw new Error("Quantity must be greater than 0");
        }

        const total = await Promise.all(
          orderData.products.map(async (p) => {
            const product = await Product.findById(p.productId).select([
              "price",
              "stock",
              "name",
            ]);
            if (!product) {
              throw new Error(`Product with ID ${p.productId} not found`);
            }
            if ((product as any).stock < p.quantity) {
              throw new Error(`Not enough stock available`);
            }
            return p.quantity * (product as any).price;
          })
        ).then((totals) => totals.reduce((acc, price) => acc + price, 0));

        const newOrder = await Order.create({
          ...orderData,
          total,
          status: "Pending",
        });

        return newOrder;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(
            error.message || "An error occurred while creating the order"
          );
        }
        throw new Error("An error occurred while creating the order");
      }
    },

    createReview: async (
      _: any,
      reviewData: {
        productId: mongoose.Schema.Types.ObjectId;
        userId: mongoose.Schema.Types.ObjectId;
        rating: number;
        comment: string;
      }
    ) => {
      try {
        console.log(reviewData);
        const review = await Review.create({
          comment: reviewData.comment,
          productId: reviewData.productId,
          rating: reviewData.rating,
          userId: reviewData.userId,
        });
        return review;
      } catch (error) {
        console.error("Error creating review:", error);
        throw error;
      }
    },
  },
};

export default resolvers;
