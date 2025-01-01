import { z } from "zod";

export default () => {
  return z.object({
    orderData: z.object({
      userId: z.string().nonempty(),
      products: z.array(
        z.object({
          productId: z.string().nonempty(),
          quantity: z.number().int().positive(),
        })
      ),
    }),
  });
};
