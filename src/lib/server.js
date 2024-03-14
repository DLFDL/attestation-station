import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const server = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: "https://sepolia.easscan.org/graphql",
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});