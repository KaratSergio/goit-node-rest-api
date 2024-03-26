import express from "express";

import authSchemas from "../schemas/authSchemas.js";

import validateBody from "../decorators/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

import authControllers from "../controllers/authControllers.js";
import upload from "../middlewares/upload.js";

import { ctrl } from "../controllers/contactsControllers.js";

const { register, login, logout, getCurrent, updateSub } = authControllers;

const { subSchema, registerSchema, loginSchema } = authSchemas;

const authRouter = express.Router();

authRouter.patch("/", authenticate, validateBody(subSchema), updateSub);

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

export default authRouter;
