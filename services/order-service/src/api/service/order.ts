import GQL from "../connection";
import { CREATE_ORDER_MUTATION } from "../queries/mutations/order";

const CreateOrderGQL = async (orderInfo: {
  products: { productId: string; quantity: number }[];
  usersId: string;
}) => {
  try {
    const response = await GQL().request(CREATE_ORDER_MUTATION, orderInfo);
    return response;
  } catch (error) {
    if ((error as any)?.response?.errors) {
      return (error as any).response.errors;
    } else {
      return error;
    }
  }
};

export default CreateOrderGQL;
