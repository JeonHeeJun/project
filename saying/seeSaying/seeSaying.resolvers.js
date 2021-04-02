import client from "../../client";

export default{
    Query:{
        seeSaying:(_,{id})=>client.saying.findUnique({
            where:{id}
        })
    }
}