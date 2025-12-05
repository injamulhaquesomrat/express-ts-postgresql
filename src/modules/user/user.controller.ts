import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;

  try {
    const result = await userServices.createUser(name, email, age);

    res.status(201).json({
      success: true,
      message: "Data Inserted Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllusers();

    res.status(201).json({
      success: true,
      message: "Users Retrived Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUser(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "No user data found.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "User fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;

    const result = await userServices.updateUser(
      name,
      email,
      age,
      req.params.id!
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "No user data found.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "No user data found.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userControllers = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
