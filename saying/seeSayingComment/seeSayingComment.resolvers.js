import client from "../../client";

export default { //페이지화 적용 필요.
    Query :{
        seeSayingComment:(_,{id,take,lastId})=>client.saying.findUnique({
            where:{
                id,
            }
        }).comments({
            take,
            skip:lastId?1:0,
            ...(lastId&&{cursor:{id:lastId}}),
        })
    }
}