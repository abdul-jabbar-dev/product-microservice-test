import { GraphQLClient } from "graphql-request";
import ENV from "../config";

const GQL = () => {
  const endpoint = `${ENV.PRODUCT_SERVICE}/graphql`;
  return new GraphQLClient(endpoint);
};

export default GQL;
