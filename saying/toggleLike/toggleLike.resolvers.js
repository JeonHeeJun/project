import client from "../../client";
import { protextResolver } from "../../users/users.utils";

export default{
    Mutation:{
        toggleLike:protextResolver(async(_,{id},{loggedUser})=>{
            const photo = await client.saying.findUnique({//요구하는 saying이있는가?
                where:{
                    id
                }
            });
            if(!photo){
                return{
                    ok: false,
                    error: "saying not found",
                }
            }
            const likeWhere = {
                sayingId_userId:{
                    userId: loggedUser.id,
                    sayingId:id,
                }
            }
            const like = await client.like.findUnique({
                where: likeWhere
            })
            if(like){
                await client.like.delete({
                    where:likeWhere
                })
            } else{
                await client.like.create({
                    data:{
                        user:{
                            connect:{
                                id:loggedUser.id
                            }
                        },
                        saying:{
                            connect:{
                                id:photo.id
                            }

                        }
                    }
                })
            }
            return {
                ok:true
            }
        })
    }
}