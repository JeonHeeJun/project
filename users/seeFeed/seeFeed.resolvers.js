import client from "../../client";
import { protextResolver } from "../users.utils";

export default {
    Query:{
        seeFeed:protextResolver(async(_,temp,{loggedUser})=>{
            //최신 좋아요 누른 글 500개의 태그 : 가중치 1
            const fromlike = await client.$queryRaw(`
            select R."B" as id , count(R."B")
            from "_SayingToTag" as R,
            (select L."sayingId" as id
            from "Like" as L 
            where L."userId" = ${loggedUser.id}
            limit 500) as S
            where R."A" = S.id
            group by R."B"`);
            console.log("FROMLIKE",fromlike)
            //user가 작성한 글의 태그 : 가중치 3
            const fromUser = await client.$queryRaw(`
            select R."B" as id, 3*count(R."B") as count
            from "_SayingToTag" as R,
            (select id
            from "Saying" as S
            where S."userId" = ${loggedUser.id}
            ) as S
            where R."A" = S.id
            group by R."B"
            limit 500`);
            //console.log(fromUser)
            //user가 관심잇는 태그 : 가중치 5
            const fromTag = await client.$queryRaw(`
            select T."A" as id , 5*count(*) as count
            from "_TagToUser" as T
            where T."B" = 1
            group by(T."A")
            order by random()
            limit 500;`);

            const tagNum = 3;
            var num = -1;
            var choiceTag = []
            const makeJoin = (input)=>{
                var join = `(`;
                for(var i=0; i<input.length;i++){
                    join = join + `${input[i]},`;
                }
                join = join.slice(0,-1)
                join = join + `)`;
                return join
            }
            const resultTag = [
                ...fromlike,
                ...fromUser,
                ...fromTag
            ]
            console.log("RESULT",resultTag);
            if(resultTag.length === 0){
                return await client.$queryRaw(`
                select *
                from "Saying" as S
                order by random()
                limit 1
                `)
            }
            var sum = 0;
            for(var i =0; i<resultTag.length;i++){
                sum += resultTag[i].count
            }
            for(var i =0; i<tagNum;i++){
                choiceTag.push(resultTag[randomTag(resultTag,sum)].id);
                choiceTag = Array.from(new Set(choiceTag))
                console.log(choiceTag)
                console.log(makeJoin(choiceTag))
                num = await client.$queryRaw(`
                select count(*) as count
                from
                (select count(S.id) as count
                from "Saying" as S, "_SayingToTag" as R 
                where S."id" = R."A" and (R."B" in ${makeJoin(choiceTag)}) 
                group by S.id 
                having count(S.id) >=${choiceTag.length}) as T       
                `)
                console.log(num);
                if(num[0].count == 0) {
                    choiceTag.pop();
                    break;
                }
            }
            if(num[0].count==0){
                console.log("num equlas 0")
            }
            else{
                console.log("8 tag is good")
            }
            
            const join = makeJoin(choiceTag);
            console.log(`R."B" in `+join)
            const final = await client.$queryRaw(`with TEM as(
                select T.id, L.id as likeid
                from 
                (select S.id 
                from "Saying" as S, "_SayingToTag" as R 
                where S."id" = R."A" and (R."B" in ${join}) 
                group by S.id 
                having count(S.id) >=${choiceTag.length}) as T
                left join (select id,"sayingId" from "Like") as L
                on T.id = L."sayingId"),
                CTE as(
                select id, count(id)+1 as likenum
                from TEM
                where likeid is not null
                group by id
                union
                select id, 1 as likenum
                from TEM
                where likeid is null
                ),
                PER as (select C.id, C.likenum/S.sum as percent
                from CTE as C, (select sum(likenum) from CTE) as S)
                
                select S.*
                from "Saying" as S, PER as P
                where P.id = S.id
                order by random()*(1.0/P.percent)
                limit 1;`);

            return final[0];
        })
    }
}

const randomTag = (input,total)=>{
    //console.log(input)
    const random = Math.floor(((total+1) * Math.random()));
    var check = 0;
    for(var i =0; i<input.length;i++){
        check += input[i].count
        if(random <= check) return i;
    }
}