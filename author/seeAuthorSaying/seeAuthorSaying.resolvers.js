import client from "../../client";

export default{
    Query:{
        seeAuthorSaying:(_,{id,take,lastId})=>client.author.findUnique({
            where:{
                id
            }
        }).sayings({
            take,
            skip:lastId?1:0,
            ...(lastId && {cursor :{id:lastId}}),
        })
    }
}