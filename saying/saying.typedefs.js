import { gql } from "apollo-server";

export default gql`
type Saying{
    id: Int!
    user: User!
    createdAt:String!
    updateAt:String!
    tags: [Tag]
    text:String!
    totalLikes:Int!
    totalComments:Int!
    isMine: Boolean!
}
type Tag{
    id:Int!
    name:String!
    sayings(take:Int!, lastId:Int): [Saying]
    totalSayings:Int!
    
}
type Like{
    id:Int!
    saying: Saying!
    createdAt:String!
    updateAt:String!

}


`;