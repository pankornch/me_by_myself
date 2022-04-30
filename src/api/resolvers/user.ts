import { IResolverType, IUser } from "../../../type"
import { ECollection, EUserRole } from "../../../type/enum"
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

export const Query: IResolverType = {
	me: auth((_, __, { user }) => {
		return user
	}),
	adminListAdminAccounts: auth(async () => {
		const res = await firestore
			.collection(ECollection.USER)
			.where("role", "==", EUserRole.ADMIN)
			.orderBy("createdAt", "asc")
			.get()
		return res.docs.map((e) => e.data())
	}, [EUserRole.ADMIN]),
}

export const Mutation: IResolverType = {
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
			role: EUserRole.USER,
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

export const User: IResolverType<IUser> = {
	fullName: (parent) => {
		return `${parent.firstName} ${parent.lastName}`
	},
	createdAt: (parent) => {
		return (parent.createdAt as any).toDate()
	},
	historyAnswers: async (parent) => {
		const res = await firestore
			.collection(ECollection.HISTORY_ANSWER)
			.where("userId", "==", parent.id)
			.orderBy("score", "desc")
			.get()
		const data = res.docs.map((e) => e.data())
		return data
	},
}
