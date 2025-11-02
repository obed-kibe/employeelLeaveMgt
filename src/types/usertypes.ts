/**
 * userType.ts
 * Compatible with leaveRequest.type.ts
 * Defines the structure of the Users (Employee) table for the Employee Leave Management System
 */

export type UserRole = 'Admin' | 'Manager' | 'Employee';

export interface User {
  staffid: number;          // Primary Key (used in leaveRequest.type.ts as foreign key)
  firstname: string;        // Employee's first name
  lastname: string;         // Employee's last name
  email: string;            // Employee's work email (unique)
  role: UserRole;           // Role: Admin, Manager, or Employee
  department?: string;      // Optional department name
  position?: string;        // Optional job title
  phone_number?: string;    // Optional contact number
  is_active: boolean;       // Account active or deactivated
  hire_date?: Date;         // Date employee joined
  created_at?: Date;        // Record creation timestamp
  updated_at?: Date;        // Last modification timestamp
}