import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/create-user", userControllers.createUser);
router.get("/get-all-users", userControllers.getUsers);
router.get("/get-single-user/:id", userControllers.getSingleUser);
router.put("/update-user/:id", userControllers.updateUser);
router.delete("/delete-user/:id", userControllers.deleteUser);

export const userRoutes = router;
