import { ApolloServer } from "apollo-server-micro"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import typeDefs from "../../src/api/typeDefs"
import resolvers from "../../src/api/resolvers"
import { FIREBASE_CONFIG_JSON } from "../../src/configs/env"

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const authorization = req.headers.authorization || ""
		return { req, authorization }
	},
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

const startServer = apolloServer.start()

export default async function handler(req: any, res: any) {
	await startServer
	await apolloServer.createHandler({
		path: "/api/graphql",
	})(req, res)
}

export const config = {
	api: {
		bodyParser: false,
	},
}
