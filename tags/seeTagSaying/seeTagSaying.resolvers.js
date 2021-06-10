import client from "../../client";

export default{
    Query:{
        seeTagSaying:(_,{id,take,lastId})=>client.tag.findUnique({
            where:{id}
        }).sayings({
            take,
            skip:lastId ? 1:0,
            ...(lastId && {cursor :{id:lastId}}),
        })
    }
}