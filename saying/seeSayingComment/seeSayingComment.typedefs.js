import { gql } from "apollo-server";

export default gql `
type Query{
    seeSayingComment(id:Int!,take:Int!,lastId:Int):[Comment]
}

`