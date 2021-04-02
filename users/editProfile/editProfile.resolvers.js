import client from "../../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { protextResolver } from "../users.utils";
import { createWriteStream }from "fs"

export default{
    Mutation :{
        editProfile: protextResolver(//Tag가 있다면 disconnect하고 새로운 Tag추가.
            async(_,
                {name,email,password:newPassword,bio,avatar,tags},
                {loggedUser}
                )=>{
                let avatarUrl = null;
                if(avatar){
                const {filename, createReadStream} = await avatar;
                const newFileName = `${loggedUser.id}-${Date.now()}-${filename}`
                const readStream = createReadStream()
                const writeStream = createWriteStream(process.cwd() +"/uploads/"+ newFileName)
                //console.log(process.cwd()+newFileName)
                readStream.pipe(writeStream);
                avatarUrl = `http://localhost:4000/static/${newFileName}`
                }

                let uglyPassword = null;
                if(newPassword){
                    uglyPassword = await bcrypt.hash(newPassword,10)
                }
                
                let newtag = null;
                if(tags){
                    const oldtags = await client.user.findUnique({
                        where:{
                            id:loggedUser.id
                        },
                        select:{
                            tags:{
                                select:{
                                    name:true
                                }
                            }
                        }
                    })
                    console.log(oldtags);
                    await client.user.update({
                        where:{
                            id:loggedUser.id
                        },
                        data:{
                            tags:{
                                disconnect:oldtags.tags,
                            }
                        }
                    })
                newtag = tags.map((name)=>({
                        name:name
                    }))
                }
                const updatedUser = await client.user.update(
                {where:{
                    id: loggedUser.id
                },data:{
                    name,
                    email,
                    bio,
                    ...(uglyPassword && {password: uglyPassword}),
                    ...(avatarUrl && {avatar: avatarUrl}),
                    ...(newtag && {tags:{connect:newtag}})
                }})
                if(updatedUser.id){
                    return{
                        ok:true
                    }
                }
                else{
                    return{
                        ok:false,
                        error:"could not update profile"
                    }
                }
            }
        )
    }
}