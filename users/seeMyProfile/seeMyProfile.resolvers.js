import client from "../../client";
import { protextResolver } from "../users.utils";

export default{
    Query:{
        seeMyProfile:
        ({loggedUser})=>client.user.findUnique({
            where:{
                id:loggedUser.id
            }
        })
        
    }
}