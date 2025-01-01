import z from "zod";
const RegisterUserSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
export default RegisterUserSchema