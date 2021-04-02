import client from "../client"

export default {
    Saying:{
        user:({userId})=>{
          return client.user.findUnique({
                where:{id:userId}
            })
        },
        tags:({id})=>client.tag.findMany({
            where:{
                sayings:{
                    some:{
                        id
                    }
                }
            }
        }),
        totalLikes:({id})=>client.like.count({
            where: {sayingId:id}
        }),
        totalComments:({id})=>client.comment.count({
            where:{
                sayingId:id
            }
        }),
        isMine:({userId},_,{loggedUser})=>{
            if(!loggedUser) return false;
            return (loggedUser.id === userId)},
    },
    Tag:{
        totalSayings:({id})=>client.saying.count({
            where:{
                tags:{
                    some:{
                        id
                    }
                }
            }
        }),
        sayings:({id},{take,lastId})=>client.tag.findUnique({//나중에 search식으로 수정필요.
            where:{
                id
            }
        }).sayings({
            take,
            skip:lastId? 1:0,
            ...(lastId && {cursor:{id:lastId}})
        })
    }

}