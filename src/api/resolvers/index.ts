import { IResolverType } from "../../../type"
import * as user from "./user"

const resolvers: IResolverType = {
	Query: {
		...user.query,
	},
	Mutation: {
		...user.mutation,
	},
}

export default resolvers
