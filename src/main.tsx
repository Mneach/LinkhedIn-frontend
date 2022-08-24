import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, ApolloLink, from, createHttpLink } from '@apollo/client';
import { StorageKey } from './lib/keys/key';
import { UserProvider } from './hooks/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const backendUrl = 'http://localhost:8080/query'
const apolloLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(StorageKey.JwtTokenKey);
  // console.log("TOKEN IN APOLLO LINK = " + token)
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const httpLink = createHttpLink({ uri: backendUrl })
const client = new ApolloClient({
  link: apolloLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ToastContainer />
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
