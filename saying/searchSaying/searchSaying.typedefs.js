import { gql } from "apollo-server";

export default gql `
type Query{
    searchSaying(keyword:String!,take:Int!,lastId:Int):[Saying]
}
`;