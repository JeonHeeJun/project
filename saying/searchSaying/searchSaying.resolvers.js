import client from "../../client";

export default{
    Query:{
        searchSaying:(_,{keyword,take,lastId})=>client.saying.findMany({
            take,
            skip: lastId ? 1:0,
            ...(lastId && {cursor :{id:lastId}}),
            where:{
                text:{
                    contains: keyword,
                }
            },
            orderBy:{
                createdAt:"asc"
            }
        }
        )
    }
}