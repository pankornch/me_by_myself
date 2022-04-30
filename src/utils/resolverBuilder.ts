import { IResolverType } from "../../type"

const resolverBuilder = (...resolvers: IResolverType[]): IResolverType => {
	const resolver: IResolverType = {
		Query: {},
		Mutation: {},
	}

	for (const r of resolvers) {
		for (const [k, v] of Object.entries(r)) {
			if (resolver[k]) {
				resolver[k] = { ...resolver[k], ...v }
			} else {
				resolver[k] = v
			}
		}
	}

	return resolver
}

export default resolverBuilder
