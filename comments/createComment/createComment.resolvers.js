import client from "../../client";
import { protextResolver } from "../../users/users.utils";

export default{
    Mutation:{
        createComment:protextResolver(async(_,{sayingId, text},{loggedUser})=>{
            const ok = await client.saying.findUnique({
                where:{
                    id:sayingId
                },
                select:{
                    id:true
                }
            })
            if(!ok){
                return{
                    ok:false,
                    error:"you need to log in"
                }
            }
            await client.comment.create({
                data:{
                    text,
                    saying:{
                        connect:{
                            id:sayingId
                        }
                    },
                    user:{
                        connect:{
                            id:loggedUser.id
                        }
                    }
                }
            });
            return {
                ok:true,
            }
        }
    )}

}