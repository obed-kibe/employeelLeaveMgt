import {Request, Response} from "express";
import * as userService from "../services/userService";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userService.createUser(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const listAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.listUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await userService.getUserById(id);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Invalid staffid") {
      res.status(400).json({ message: "Invalid staffid" });
    } else if (error.message === "User not found") {
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  try {
    const result = await userService.updateUser(id, updates);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Invalid staffid") {
      res.status(400).json({ message: "Invalid staffid" });
    } else if (error.message === "User not found") {
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await userService.deleteUser(id);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Invalid staffid") {
      res.status(400).json({ message: "Invalid staffid" });
    } else if (error.message === "User not found") {
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};