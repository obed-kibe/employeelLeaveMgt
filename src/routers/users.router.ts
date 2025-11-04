import { Express } from "express";
import * as userController from "../controllers/users.controllers";


const userroutes = (app:Express) => {
    app.post('/users', userController.createUser)
    app.get('/users', userController.listAllUsers)
    app.get('/users/:id', userController.getUserById)
    app.put('/users/:id', userController.updateUser)
    app.delete('/users/:id', userController.deleteUser)
    app.post('/login',userController.loginUser)
}

export default userroutes;