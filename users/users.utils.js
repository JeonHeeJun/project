import client from "../client"
import jwt from "jsonwebtoken"


export const getUser = async(token) =>{
    try{
        const {id} = await jwt.verify(token, process.env.SECRET_KEY)
        const user = await client.user.findUnique({where:{id}});
        if(!token){//토큰이 없을수도있음
            return null;
        }
        if(user){
            return user;
        }
        else{
            return null;
        }
    }
    catch{
        return null;
    }
}

export const protextResolver = (ourResolver) =>(root,args,context,info)=>{
    if(!context.loggedUser){
        const query  = info.operation.operation === "query";
        if(query){
            return null;
        }
        else{
        return {
            ok:false,
            error:"You need to log in."
        }
    }
    }
        return ourResolver(root,args,context,info);
}


