import { AuthenticationError } from "apollo-server-core"
import { IContext, IResolver, IUser } from "../../../type"
import { EUserRole } from "../../../type/enum"
import { extractBearerToken, extractTokenUserMetadata } from "../../utils/token"

export default function auth(handler: IResolver, roles?: EUserRole[]) {
	return async (parent: any, args: any, context: IContext, info: any) => {
		try {
			const token = extractBearerToken(context.authorization)
			const user = await extractTokenUserMetadata(token)
			if (roles?.length && !roles?.includes(user.role)) {
				return new AuthenticationError("Invalid user role")
			}
			context.user = user
			return handler(parent, args, context, info)
		} catch (error: any) {
			return new AuthenticationError(error.message)
		}
	}
}
