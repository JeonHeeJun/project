import client from "../../client";
import { protextResolver } from "../../users/users.utils";

export default{
    Mutation:{
        deleteSaying:protextResolver(
            async(_,{id},{loggedUser})=>{
                const saying = await client.saying.findUnique({
                    where:{id},
                    select:{
                        userId: true,
                    }
                })
                //console.log(saying)
                if(!saying){
                    return{
                        ok:false,
                        error:"saying not found"
                    }
                }
                else if(saying.userId !== loggedUser.id){
                    return{
                        ok:false,
                        error:"you are not Saying Owner"
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
                    await client.saying.deleteMany({
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

            }
        )
    }
}