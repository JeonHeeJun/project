import { gql } from "apollo-server";

export default gql`
    type Query{
        seeSaying(id:Int!):Saying
        
    }

`