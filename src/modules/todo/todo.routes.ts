import express from "express";
import { todoControllers } from "./todo.controller";

const router = express.Router();

router.post("/create-todo", todoControllers.createTodo);
router.get("/get-all-todos", todoControllers.getAllTodos);

export const todoRoutes = router;
