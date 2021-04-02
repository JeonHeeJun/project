import { gql } from "apollo-server-core";

export default gql `
type Mutation{
    createComment(sayingId:Int!,text:String!):MutationResponse

}


`