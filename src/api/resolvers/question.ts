import { AuthenticationError, UserInputError } from "apollo-server-core"
import { v1 } from "uuid"
import { IAnswer, IHistoryResult, IResolverType } from "../../../type"
import arrayToMap from "../../utils/arrayToMap"
import getCriteria from "../../utils/getCriteria"
import { extractBearerToken, extractTokenUserMetadata } from "../../utils/token"
import { firestore } from "../../configs/firebase"
import { ECollection, EUserRole } from "../../../type/enum"
import { choices, criterias, questions } from "../data/question"
import auth from "../middleware/auth"
import { SortInput, SubmitAnswerInput } from "../../../type/gql"

const choiceMap = arrayToMap(choices, "id")
const questionMap = arrayToMap(questions, "id")

export const Query: IResolverType = {
	questions: () => questions,
	adminGetHistoryResults: auth(
		async (_, { sortInput }: { sortInput: SortInput }) => {
			const res = await firestore
				.collection(ECollection.HISTORY_RESULT)
				.orderBy(sortInput.orderBy || "createdAt", sortInput.type || "desc")
				.get()
			return res.docs.map((e) => e.data())
		},
		[EUserRole.ADMIN, EUserRole.SUPER_ADMIN]
	),
	getResultById: async (_, { id }: { id: string }, { authorization }) => {
		// let userId: string | null = null
		// if (authorization) {
		// 	try {
		// 		const token = extractBearerToken(authorization)
		// 		const user = await extractTokenUserMetadata(token)
		// 		userId = user.id
		// 	} catch (error: any) {
		// 		return new AuthenticationError(error.message)
		// 	}
		// }

		const resultRes = await firestore
			.collection(ECollection.HISTORY_RESULT)
			.doc(id)
			.get()

		if (!resultRes.exists) {
			return new UserInputError("Incorrect result id")
		}

		return resultRes.data()
	},
}

export const Mutation: IResolverType = {
	submitAnswer: async (_, { input }: SubmitAnswerInput, { authorization }) => {
		let userId: string | null = null
		if (authorization) {
			try {
				const token = extractBearerToken(authorization)
				const user = await extractTokenUserMetadata(token)
				userId = user.id
			} catch (error: any) {
				return new AuthenticationError(error.message)
			}
		}

		let score: number = 0

		for (const answer of input.answers) {
			score += choiceMap[answer.choiceId].score
		}

		const criteria = getCriteria(criterias, score)

		const answers = input.answers as any

		const historyResult: IHistoryResult = {
			id: v1(),
			userId,
			answers,
			score,
			criteria: criteria!.criteria,
			isShare: !!input.isShare,
			createdAt: new Date(),
		}

		await firestore
			.collection(ECollection.HISTORY_RESULT)
			.doc(historyResult.id)
			.set(historyResult)

		return historyResult
	},
	adminDeleteHistoryResult: auth(
		async (_, { id }: { id: string }) => {
			await firestore.collection(ECollection.HISTORY_RESULT).doc(id).delete()
			return "Delete success"
		},
		[EUserRole.ADMIN, EUserRole.SUPER_ADMIN]
	),
}

export const HistoryResult: IResolverType<IHistoryResult> = {
	answers: (parent) => {
		return parent.answers
	},
	createdAt: (parent) => {
		return (parent.createdAt as any).toDate()
	},
	user: async (parent) => {
		if (!parent.userId) return null

		const res = await firestore
			.collection(ECollection.USER)
			.doc(parent.userId)
			.get()

		return res.data()
	},
	isAnonymous: (parent) => {
		return !parent.userId
	},
}

export const Answer: IResolverType<IAnswer> = {
	question: (parent) => {
		const question = questionMap[parent.questionId]
		return question
	},
	choice: (parent) => {
		const choice = choiceMap[parent.choiceId]
		return choice
	},
}
