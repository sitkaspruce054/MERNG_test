import React from 'react'
import App from './App'
import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from '@apollo/client'
import { createHttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'http://localhost:3000'
})

const authLink = setContext(()=> {
    const token = localStorage.getItem('jwtToken')
    return{
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)}
})



export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)