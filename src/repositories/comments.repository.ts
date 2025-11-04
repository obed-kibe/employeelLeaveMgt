import { getPool } from "../db/config"

 export const getcommentbyid = async(id:number) =>{
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id',id)
        .query('SELECT * FROM comments WHERE commentid = @id')
        return result.recordset[0]
 }