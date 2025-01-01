export const CREATE_ORDER_MUTATION = `
    mutation CreateOrder($orderData: CreateOrderData!) {
      createOrder(orderData: $orderData) {
        _id
        status
        total
        products {
          quantity
          product {
            _id
            name
          }
        }
        createdAt
      }
    }
  `;
