import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import { logger } from "../../middleware/logger";

const router = express.Router();

router.post("/create-user", userControllers.createUser);
router.get("/get-all-users", logger, auth("admin"), userControllers.getUsers);
router.get(
  "/get-single-user/:id",
  auth("admin", "user"),
  userControllers.getSingleUser
);
router.put(
  "/update-user/:id",
  auth("admin", "user"),
  userControllers.updateUser
);
router.delete(
  "/delete-user/:id",
  auth("admin"),
  userControllers.deleteUser
);

export const userRoutes = router;
