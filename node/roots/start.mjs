import express from "express";
import UserController from "../controllers/UsersController.mjs";
import AuthMiddleware from "../middlewares/auth.js";
import AuthentificationController from "../controllers/AuthentificationController";

const router = express.Router();

router.get("/users", UserController.index);
router.post("/users", UserController.store);
router.get("/users/:id", UserController.show);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.destroy);
router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  AuthMiddleware.authenticate,
  UserController.getMyProfil
);

export default router;
