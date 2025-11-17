import { Express } from "express";
import * as leaverequest from "../controllers/leaverequest.controllers"
import { adminOnly, userOnly } from "../middleware/bearAuth";


const requestleaveroutes = (app:Express) => {
        app.post('/leave',userOnly, leaverequest.requestleave)
        app.get('/leave/:id/history',userOnly,leaverequest.leavehistory)
        app.get('/leave/:id',userOnly,leaverequest.getleavebyid)
        app.get('/leave', adminOnly,leaverequest.listallrequests)
        app.put('/leave/:id', userOnly, leaverequest.updateleave)
        app.delete('/leave/:id', userOnly, leaverequest.deleteleave)
}

export default requestleaveroutes;