import client from "../../client";
import { protextResolver } from "../../users/users.utils";

export default {
    Mutation:{
        uploadSaying:protextResolver(async(_,{text,tag},{loggedUser})=>{
            //console.log(tag)
            const tagObj = tag.map((name)=>({
                where:{name},
                create:{name}
            }))
            //console.log(tagObj)
            try{
            await client.saying.create({
                data:{
                    text,
                    user:{
                        connect:{
                            id:loggedUser.id,
                        }
                    },
                    tags:{
                        connectOrCreate: tagObj,
                    },
                    
                }
            })
            return{
                ok:true
            }
            }
            catch(e){
                console.log(e)
                return {
                    ok:false,
                    error:"create failed"
                }
            }
        
        })
    }
}