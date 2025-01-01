import express from "express";
import {
  getUsers,
  createUser,
  registerUser,
  loginUser,
  getUser
} from "./controllers/userController";
import ROUTE_AUTH from "./auth";
const router = express.Router();

router.get("/", ROUTE_AUTH(["user"]), getUsers);
router.get("/:id",  getUser);
router.post("/", createUser);
router.post("/register", registerUser);
router.get("/login", loginUser);

export default router;
