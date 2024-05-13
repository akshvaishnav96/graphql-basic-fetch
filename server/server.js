import express from "express";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors"
import axios from "axios";

const port = process.env.PORT || 3000;

const startServer = async () => {

  const app = express();
  const server = new ApolloServer({
    typeDefs: `

    type Todo {
      id:ID!
      userId:ID!
      title:String
      completed:Boolean
      user: User
    }

    type Geo {
     
        lat: String
        lng: String
    
    }

    type Address {
      street: String,
      suite: String,
      city: String,
      zipcode: String,
      geo:Geo
    }

    type User {
      id: ID!,
    name: String,
    username: String,
    email: String,
    address: Address
    }

    type Query {
      getTodos: [Todo]
      getUsers: [User]
      getSingleUser(id:ID!) : User
      
    }

    `,

    resolvers: {

      Todo: {
        user: async (todo) => {
          const data = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
          return data.data
        },
        


      },


      Query: {
        getTodos: async function () {
          const data = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
          return data.data
        },

        getUsers: async function () {
          const data = await axios.get(`https://jsonplaceholder.typicode.com/users`);
          return data.data
        },

        getSingleUser: async function (parent, { id }) {
          const data = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
          return data.data
        }
      }
    }



  });

  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors());

  await server.start();

  app.use('/graphql', expressMiddleware(server))

  app.listen(port, () => {
    console.log(`app is listening at port: ${port}`);
  })



}


startServer()

