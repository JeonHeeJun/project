require('dotenv').config()
import {ApolloServer} from 'apollo-server-express'
import {typeDefs, resolvers} from './schema'
import { getUser, protextResolver } from './users/users.utils';
import express from "express"
import logger from "morgan"

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context:async({req})=>{
        //console.log(req.headers)
        return {
            loggedUser: await getUser(req.headers.authorization), 
            protextResolver
        }
    }
}); 
const PORT = process.env.PORT;

const app = express()
app.use(logger("tiny"))
apollo.applyMiddleware({app})
app.use("/static",express.static("uploads"))
app.listen({port: PORT},() =>{
    console.log(`http://localhost:${PORT}/graphql`);
});