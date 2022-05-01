import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
})

import { setContext } from "@apollo/client/link/context"

const authLink = setContext(async (_, { headers }) => {
	let accessToken: string | null = null
	if (typeof window !== "undefined") {
		accessToken = localStorage.getItem("access_token")
	}
	return {
		headers: {
			...headers,
			authorization: accessToken ? `Bearer ${accessToken}` : "",
		},
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink)!,
	cache: new InMemoryCache({ addTypename: false }),
})

export default client
