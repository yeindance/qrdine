'use client'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:5050/graphql',
	cache: new InMemoryCache(),
})

export default client

export const MyApolloProvider = ({ children }: { children: React.ReactNode }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}
