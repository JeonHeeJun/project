import { gql } from "apollo-server";

export default gql `
type Query{
    seeTagSaying(id:Int!, take:Int!, lastId:Int):[Saying]
}
 `;