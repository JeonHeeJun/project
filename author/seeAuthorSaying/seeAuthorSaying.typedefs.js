import { gql } from "apollo-server";

export default gql `
type Query{
    seeAuthorSaying(take:Int!,lastId:Int,id:Int!):[Saying]
}

`;