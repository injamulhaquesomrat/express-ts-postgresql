import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

// parser
app.use(express.json()); //for json
// app.use(express.urlencoded()); // for form data

// DB initialization
initDB();

// logger middleware

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World of Somrat");
});

// users CRUD
app.use("/users", userRoutes);

// todos crud
app.use("/todos", todoRoutes);

// auth CRUD
app.use("/auth", authRoutes);


// 404 not found 
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


export default app;
