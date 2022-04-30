import { IResolverType, IUser } from "../../../type"
import { ECollection } from "../../../type/enum"
import { firestore } from "../../configs/firebase"
import { createToken } from "../../utils/token"
import auth from "../middleware/auth"
import { v1 } from "uuid"
import bcrypt from "bcryptjs"
import { AuthenticationError, UserInputError } from "apollo-server-core"

interface CreateUserInput {
	input: {
		telNumber: string
		firstName: string
		lastName: string
		password: string
	}
}

interface LoginInput {
	input: {
		telNumber: string
		password: string
	}
}

export const query: IResolverType = {
	me: auth((_, __, { user }) => {
		return user
	}),
}

export const mutation: IResolverType = {
	createUser: async (_, { input }: CreateUserInput) => {
		const userRes = await firestore
			.collection(ECollection.USER)
			.where("telNumber", "==", input.telNumber)
			.get()
		if (userRes.docs.length) {
			return new UserInputError(
				`this phone number: ${input.telNumber} has already exists`
			)
		}

		const userData: IUser = {
			id: v1(),
			firstName: input.firstName,
			lastName: input.lastName,
			telNumber: input.telNumber,
			password: await bcrypt.hash(input.password, 10),
			role: "USER",
			createdAt: new Date(),
		}

		await firestore.collection(ECollection.USER).doc(userData.id).set(userData)
		const token = createToken(userData.id)

		return { token, user: userData }
	},
	login: async (_, { input }: LoginInput) => {
		const userRes = await firestore
			.collection(ECollection.USER)
			.where("telNumber", "==", input.telNumber)
			.get()
		if (!userRes.docs.length) {
			return new AuthenticationError("Incorrect phone number or password")
		}

		const user = userRes.docs[0].data() as IUser

		if (!(await bcrypt.compare(input.password, user.password))) {
			return new AuthenticationError("Incorrect phone number or password")
		}

		const token = createToken(user.id)

		return { token, user }
	},
}

export const User: IResolverType = {}
