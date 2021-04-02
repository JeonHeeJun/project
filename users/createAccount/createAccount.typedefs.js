import {gql} from 'apollo-server'

export default gql `

       type Mutation {
        createAccount(
            name:String!
            email:String!
            password:String!
        ): MutationResponse
       }
`;