import * as userRepository from "../repositories/userRepository.js";
import { User } from "../types/usertypes.js";

// 🟢 Create a new user
export const createUser = async (user: Omit<User, "staffid">) => {
  return await userRepository.createUser(user);
};

// 🟢 Get all users
export const listUsers = async () => {
  return await userRepository.getAllUsers();
};

// 🟢 Get a user by staffid
export const getUserById = async (staffid: number) => {
  if (isNaN(staffid)) {
    throw new Error("Invalid staffid");
  }

  const existingUser = await userRepository.getUserById(staffid);
  if (!existingUser) {
    throw new Error("User not found");
  }

  return existingUser;
};

// 🟢 Update user details
export const updateUser = async (staffid: number, updates: Partial<User>) => {
  if (isNaN(staffid)) {
    throw new Error("Invalid staffid");
  }

  const existingUser = await userRepository.getUserById(staffid);
  if (!existingUser) {
    throw new Error("User not found");
  }

  return await userRepository.updateUser(staffid, updates);
};

// 🟢 Delete user
export const deleteUser = async (staffid: number) => {
  if (isNaN(staffid)) {
    throw new Error("Invalid staffid");
  }

  const existingUser = await userRepository.getUserById(staffid);
  if (!existingUser) {
    throw new Error("User not found");
  }

  return await userRepository.deleteUser(staffid);
};