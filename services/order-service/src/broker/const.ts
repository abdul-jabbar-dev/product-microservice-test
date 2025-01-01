const Topic = {
  ORDER: {
    CREATED: {
      title: "order/created",
      fn: (orderId: string, orderDetails: any) => {
        const orderEvent = {
          eventType: "order/created",
          orderId,
          orderDetails,
        };
        return JSON.stringify(orderEvent);
      },
    },
    UPDATED: "order/updated",
    DELETED: "order/deleted",
  },
};
export default Topic;
