import { gql } from "apollo-server";

export default gql `
type Query{
    seeUserLike(userId:Int!,take:Int!,lastId:Int):[Saying]
}

 `;