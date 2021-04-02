import { gql } from "apollo-server";

export default gql `
    type Mutation{
        deleteSaying(id:Int!):MutationResponse
    }

`;