import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_GQL = "https://beta.pokeapi.co/graphql/v1beta";

const client = new ApolloClient({
  uri: API_GQL,
  cache: new InMemoryCache()
});

export default client;
