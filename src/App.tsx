import "./styles.css";

import { ApolloProvider } from "@apollo/client";
import Client from "./gql";

import Home from "./pages/Home";

export default function App() {
  return (
    <ApolloProvider client={Client}>
      <div className="App">
        <h1>Recoil React TS Test</h1>
        <Home />
      </div>
    </ApolloProvider>
  );
}
