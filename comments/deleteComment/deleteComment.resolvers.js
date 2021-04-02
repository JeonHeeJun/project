import client from "../../client";
import { protextResolver } from "../../users/users.utils";

export default {
    Mutation:
    {
    deleteComment:protextResolver(async(_,{id},{loggedUser})=>{
        const comment = await client.comment.findUnique({
            where:{id},
            select:{
                userId:true
            }
        })
        console.log(comment)
        if(!comment){
            return {
                ok:false,
                error:"comment not found"
            }
        }
        else if(comment.userId !== loggedUser.id){
            return{
                ok:false,
                error:"you are not comment Owner"
            }
        }
        else{
            await client.comment.delete({
                where:{id}
            })
            return {
                ok:true
            }
        }
    })
    }
}