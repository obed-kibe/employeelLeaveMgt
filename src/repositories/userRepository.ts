import { getPool } from "../db/config";
import { User } from "../types/usertypes.js";
export const createUser = async (user: Omit<User, "staffid">) => {
  const pool = await getPool();
  await pool
    .request()
    .input("firstname", user.firstname)
    .input("lastname", user.lastname)
    .input("email", user.email)
    .input("role", user.role)
    .input("department", user.department)
    .input("position", user.position)
    .input("phone_number", user.phone_number)
    .input("is_active", user.is_active)
    .input("hire_date", user.hire_date || new Date())
    .query(
      `INSERT INTO Users 
        (firstname, lastname, email, role, department, position, phone_number, is_active, hire_date) 
       VALUES 
        (@firstname, @lastname, @email, @role, @department, @position, @phone_number, @is_active, @hire_date)`
    );

  return { message: "User has been created successfully" };
};
export const getAllUsers = async (): Promise<User[]> => {
  const pool = await getPool();
  const result = await pool.request().query("SELECT * FROM Users");
  return result.recordset;
};
export const getUserById = async (id: number): Promise<User | null> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", id)
    .query("SELECT * FROM Users WHERE staffid=@id");
  return result.recordset[0] || null;
};
export const updateUser = async (id: number, updates: Partial<User>) => {
  const pool = await getPool();
  await pool
    .request()
    .input("id", id)
    .input("firstname", updates.firstname)
    .input("lastname", updates.lastname)
    .input("email", updates.email)
    .input("role", updates.role)
    .input("department", updates.department)
    .input("position", updates.position)
    .input("phone_number", updates.phone_number)
    .input("is_active", updates.is_active)
    .query(
      `UPDATE Users 
       SET firstname=@firstname, lastname=@lastname, email=@email, role=@role, 
           department=@department, position=@position, phone_number=@phone_number, 
           is_active=@is_active 
       WHERE staffid=@id`
    );

  return { message: "User has been updated successfully" };
};
export const deleteUser = async (id: number) => {
  const pool = await getPool();
  await pool.request().input("id", id).query("DELETE FROM Users WHERE staffid=@id");
  return { message: "User has been deleted successfully" };
};