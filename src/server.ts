import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
const port = config.port;

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


// app.delete("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(
//       `
//         DELETE FROM users WHERE id = $1
//         `,
//       [req.params.id]
//     );

//     if (result.rowCount === 0) {
//       res.status(404).json({
//         success: false,
//         message: "No user data found.",
//       });
//     } else {
//       res.status(201).json({
//         success: true,
//         message: "User deleted successfully",
//         data: result.rows[0],
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// todos crud
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `
        INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *
        `,
      [user_id, title]
    );
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
        SELECT * FROM todos
        `);

    res.status(201).json({
      success: true,
      message: "Todos Retrived Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
});

// not found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(port, () => {
  console.log(`My app listening on port ${port}`);
});
