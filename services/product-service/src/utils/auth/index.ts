import bcrypt from "bcrypt";
import env from "../../env";

export default {
  hashedPassword: async (password: string) => {
    return await bcrypt.hashSync(password, env.SOLT_ROUND);
  },
};
