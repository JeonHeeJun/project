import parse from"csv-parse/lib/sync"
import fs from "fs"
import client from "../client"
export default {
    Mutation:{
        addCSV:async(_,{fileName})=>{

            const csv = fs.readFileSync(process.cwd()+`/init/${fileName}`)
            //console.log(csv.toString())
            const record = parse(csv.toString())
            //console.log(record)
            //user, text, tag
            const all = record.map((row)=>
            ({
                user:{
                    connectOrCreate:{
                        where:{name:row[0]},
                        create:{name:row[0]}
                    }
                },
                text:row[1],
                tags:{
                    connectOrCreate: JSON.parse(row[2].replaceAll('\'','\"')).map((name)=>({
                        where:{name},
                        create:{name}
                    }))
                }
            }) 
            )
            //console.log("여기실행ㅇㅋ?")
            try{
                
                for(var i = 0;i <all.length;i++){
                await client.saying.create({
                    data:all[i]
                })}
        
            return{
                ok:true,
            }
         }
         catch(e){
             console.log(e)
         }
        }
    }
}
