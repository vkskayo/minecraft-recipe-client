import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import "./index.css";
import Foods from "./pages/Foods";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const client = new ApolloClient({
  uri: "https://minecraft-recipe-server-production.up.railway.app/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/foods",
    element: <Foods />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>
);
