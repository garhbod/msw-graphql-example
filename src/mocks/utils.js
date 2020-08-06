import { response, context } from 'msw';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql";
import faker from "faker";

export async function mockedResponse(request, ...transformers) {
  // Fill this in with the schema string
  const schemaString = `
      type Query {
          books: [Book!]
          movies: [Movie!]
      }

      type Book {
          id: ID!
          title: String!
          author: String!
      }

      type Movie {
          id: ID!
          title: String!
          director: String!
          synopsis: String!
      }
    `;

  // Make a GraphQL schema with no resolvers
  const schema = makeExecutableSchema({ typeDefs: schemaString });
  const mocks = {
    String: () => faker.lorem.words(3),
    Book: () => ({
      title: faker.company.catchPhrase(),
      author: faker.name.findName(),
    }),
    Movie: () => ({
      title: faker.commerce.productName(),
      director: faker.name.findName(),
      synopsis: faker.company.bs(),
    })
  };

  // Create a new schema with mocks
  const schemaWithMocks = addMocksToSchema({ schema, mocks });

  const result = await graphql(schemaWithMocks, request.body.query);

  return response(
      context.data(result.data),
      // context.delay(1500),
      ...transformers
  );
}
