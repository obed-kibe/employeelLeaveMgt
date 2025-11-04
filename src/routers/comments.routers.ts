import * as commentscontrollers from "../controllers/comments.controller"
import { Express } from "express";


const commentsrouters = (app:Express) => {
        app.get('/approvals/:id',commentscontrollers.getcommentbyid)
}

export default commentsrouters;
