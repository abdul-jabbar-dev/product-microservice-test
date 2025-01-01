import { Request, Response } from "express";

import User from "../models/User";
import JWT from "../utils/JWT";
import { JWT_TOKEN_PAYLOAD } from "../types/utils";
import { IRegisterUser } from "../types/user";
import Hashed from "../utils/Hashed";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};
export const getUser = async (req: Request, res: Response) => {
  const users = await User.findById(req.body.id);
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = User.create({ name, email, password });

  res.status(201).json(user);
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: IRegisterUser = req.body;
    const user = await User.create({ name, email, password });
    if (!user) {
      throw new Error("User registration failed");
    }
    user.password = undefined;
    //  gen token
    const token = JWT.generateToken({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
    } as JWT_TOKEN_PAYLOAD);

    res.status(201).json({ data: user, token });
  } catch (ERROR) {
    res.status(500).json({ message: ERROR });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IRegisterUser = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not valid");
    }
    const varifyPass = await Hashed.compare(password, user.password as string);

    if (!varifyPass) {
      throw new Error("Incorrect password!");
    }
    user.password = undefined;
    //  gen token
    const token = JWT.generateToken({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
    } as JWT_TOKEN_PAYLOAD);

    res.status(201).json({ data: user, token });
  } catch (ERROR) {
    console.log(ERROR);
    res
      .status(500)
      .json({ message: (ERROR as any).message || ERROR, error: true });
  }
};
