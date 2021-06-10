import client from "../../client";

export default{
    Query:{
        seeUserSaying:(_,{id,take,lastId})=>client.user.findUnique({
            where:id
        }).sayings({
            take,
            skip:lastId ? 1:0,
            ...(lastId && {cursor :{id:lastId}}),
        })
    }

}