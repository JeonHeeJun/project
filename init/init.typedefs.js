import { gql } from "apollo-server";


export default gql `
type Mutation{
    addCSV(fileName:String!):MutationResponse
}

`;