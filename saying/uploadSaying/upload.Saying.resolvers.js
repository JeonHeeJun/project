import client from "../../client";
import { protextResolver } from "../../users/users.utils";

export default {
    Mutation:{
        uploadSaying:protextResolver(async(_,{text,tag,author},{loggedUser})=>{
            //console.log(tag)
            const tagObj = tag.map((name)=>({
                where:{name},
                create:{name}
            }))
            //console.log(tagObj)
            try{
            const what = await client.saying.create({
                data:{
                    text,
                    user:{
                        connect:{
                            id:loggedUser.id,
                        }
                    },
                    author:{
                        connectOrCreate:{
                          where:{name:author},
                          create:{name:author}  
                        }
                    },
                    tags:{
                        connectOrCreate: tagObj,
                    },
                    
                }
            })
            console.log(what);
            return what;
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