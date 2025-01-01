import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Review {
    _id: ID!
    product: Product!
    user: User!
    comment: String!
    rating: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    _id: ID!
    title: String!
    products: [Product!]
  }

  enum OrderStatus {
    Pending
    Shipped
    Delivered
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Product {
    _id: ID!
    name: String!
    price: Int!
    stock: Int!
    reviews: [Review!]
    category: Category!
    description: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    categories: [Category!]!
    products: [Product!]!
    product(id: ID!): Product
    users: [User!]!
    user(id: ID!): User
    reviews(productId: ID!): [Review!]!
    orders(userId: ID!): [Order!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    createCategory(title: String!): Category
    createProduct(productData: CreateProductData!): Product
    createOrder(orderData: CreateOrderData!): Order
    createReview(reviewData: CreateReviewData!): Review
  }
  type OrderProduct {
    product: Product!
    quantity: Int!
  }
  type Order {
    _id: ID!
    products: [OrderProduct!]!
    user: User!
    status: OrderStatus!
    total: Int!
    createdAt: String!
    updatedAt: String!
  }

  input CreateReviewData {
    productId: ID!
    rating: Int! 
    userId: ID!
    comment: String!
  }

  input CreateOrderData {
    products: [OrderProductInput!]!
    userId: ID!
  }

  input OrderProductInput {
    productId: ID!
    quantity: Int!
  }

  input CreateProductData {
    name: String!
    price: Int!
    stock: Int!
    category: ID!
    description: String!
  }
`;

export default typeDefs;
