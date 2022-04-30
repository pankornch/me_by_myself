import { AuthenticationError } from "apollo-server-core"
import { IContext, IResolver, IUser } from "../../../type"
import { ECollection } from "../../../type/enum"
import { firestore } from "../../configs/firebase"
import { verifyToken } from "../../utils/token"

export default function auth(handler: IResolver) {
	return async (parent: any, args: any, context: IContext, info: any) => {
		const [_, token] = context.authorization!.split(" ")

		try {
			const { sub } = verifyToken(token)
			const userRes = await firestore
				.collection(ECollection.USER)
				.doc(sub as string)
				.get()

			if (!userRes.exists) return new AuthenticationError("User is not exist")

			context.user = userRes.data() as IUser
			return handler(parent, args, context, info)
		} catch (error: any) {
			return new AuthenticationError(error.message)
		}
	}
}
