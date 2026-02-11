import { Router } from "express";
import { getAllUsers, login, register } from "./users.controller.js";
import { userValidation } from "./validation.js";
import { verifyToken } from "../../middleware/verify-token.js";

import { upload } from "../../middleware/upload.js";

const usersRouter = Router();

usersRouter.route("/").get(verifyToken, getAllUsers);
usersRouter.route("/login").post(login);
usersRouter
  .route("/register")
  .post(upload.single("avatar"), userValidation, register);

export { usersRouter };
