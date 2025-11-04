import * as commentsservices from "../services/comments.services"
import {Request, Response} from "express";

export const getcommentbyid = async (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
    
    try{
        const result = await commentsservices.getcommentsbyid(id)
        res.status(200).json(result)
    }catch (error:any) {
        if(error.message === 'invalid comment id') {
            res.status(400).json({message:'invalid comment id'})
        }else if(error.message == 'comment not available'){
            res.status(400).json({message:'comment not available'})
        }else{
            res.status(500).json({error:'Internal Server Error'})
        }
    }
}

