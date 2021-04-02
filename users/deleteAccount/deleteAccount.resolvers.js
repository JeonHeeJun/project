import client from "../../client";
import { protextResolver } from "../users.utils";

export default{
    Mutation:{
    deleteAccount: protextResolver(async(_,{id},{loggedUser})=>{
        const user = await client.user.findUnique({
            where:{id}
        })
        //console.log(saying)
        if(!user){
            return{
                ok:false,
                error:"user not found"
            }
        }
        else if(user.id !== loggedUser.id){
            return{
                ok:false,
                error:"you are not that User"
            }
        }
        else{
            await client.like.deleteMany({
                where:{
                    userId:id
                }
            })
            await client.comment.deleteMany({
                where:{
                    userId:id
                }
            })
            await client.user.delete({
                where:{id}
            })
            return{
                ok:true,
            }
        }


    })
    }
}