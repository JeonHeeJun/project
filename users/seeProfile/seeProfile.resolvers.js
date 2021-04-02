import client from "../../client"

export default{
    Query:{
        seeProfile:(_,{name}) =>
            client.user.findUnique({
                where:{
                    name
                }
            })
        
    }
};