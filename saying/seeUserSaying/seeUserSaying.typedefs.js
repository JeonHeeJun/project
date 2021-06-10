import { gql } from "apollo-server";

export default gql `
type Query{
seeUserSaying(id:Int!, take:Int!, lastId:Int):[Saying]
}
 `;