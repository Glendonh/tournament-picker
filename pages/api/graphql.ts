// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createSchema, createYoga } from 'graphql-yoga'

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      greetings: String
    }
  `,
  resolvers: {
    Query: {
      greetings: () => 'This is the `greetings` field of the root `Query` type',
    },
  },
})

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
})
