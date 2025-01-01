import bcrypt, { compare } from "bcrypt";
export default {
  encrypt: async (password: string, solt: number) =>
    await bcrypt.hash(password, solt),
  compare:async (password: string, hashedPassword: string) => await compare(password, hashedPassword),
};
