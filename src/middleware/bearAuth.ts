import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export const checkRoles = (requiredRole: "Admin" | "Employee" | "both") => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;

       
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const token = authHeader.split(' ')[1];

        try {
          
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

           
            (req as any).user = decoded;

            
            if (typeof decoded === 'object' &&
                decoded !== null &&
                "role" in decoded
            ) {
                
                if (requiredRole === "both") {
                    
                    if (decoded.role === "Admin" || decoded.role === "Employee") {
                        next();
                        return;
                    }
                } else if (decoded.role === requiredRole) {
                    
                    next(); 
                    return;
                }

                res.status(401).json({ message: "Unauthorized" });
                return;
            } else {
           
                res.status(401).json({ message: "Invalid Token Payload" });
                return;
            }
        } catch (error) {
        
            res.status(401).json({ message: 'Invalid Token' });
            return;
        }
    }
}

export const adminOnly = checkRoles("Admin");  
export const userOnly = checkRoles("Employee");   
export const adminUser = checkRoles("both");