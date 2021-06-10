import client from "../../client"

export default {
    Query:{
        seeUserLike:async(_,{userId, take, lastId})=>{
           const userLikes = await client.user.findUnique({
                where:{id:userId}
            }).likes({
                take,
                skip:lastId?1:0,
                ...(lastId && {cursor :{id:lastId}}),
            })
            
            const cond = userLikes.map(({sayingId})=>({
                    id:sayingId
            }))
            
            //console.log(cond);
            return client.saying.findMany({
                where:{
                    OR:cond
                }
            })
        }
    }
}