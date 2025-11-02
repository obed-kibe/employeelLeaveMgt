import * as commentsrepository from "../repositories/comments.repository"


export const getcommentsbyid = async(id:number) =>{
if(isNaN(id)){
    throw new Error('invalid comment id')
}
const existingcomment = await commentsrepository.getcommentbyid(id)
if(!existingcomment){
    throw new Error('comment not available')
}
return existingcomment;
}