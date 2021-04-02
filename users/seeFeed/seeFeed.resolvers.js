import client from "../../client";
import { protextResolver } from "../users.utils";

export default {
    Query:{
        seeFeed:protextResolver(async(_, {take},{loggedUser})=>{
           const {tags} = await client.user.findUnique({
                where:{
                    id:loggedUser.id
                },
                select:{
                    tags:{
                        select:{
                            name:true
                        }
                    }

                }
            })
            //console.log(tags)
            return client.saying.findMany({//랜덤하게?? 
                take,
                where:{
                    tags:{
                        some:{
                            OR:tags
                        }
                    }
                }
            })
            //console.log(rec)
            
        })
    }
}