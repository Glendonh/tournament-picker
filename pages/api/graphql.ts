import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'here I am',
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

let hasStarted = false

export default async function handler(req, res) {
  if (!hasStarted) {
    await apolloServer.start() // Start the Apollo Server
    hasStarted = true
  }
  const handler = apolloServer.createHandler({ path: '/api/graphql' })
  return handler(req, res)
}
