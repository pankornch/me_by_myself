import { AuthenticationError } from "apollo-server-core"
import { v1 } from "uuid"
import { IAnswer, IHistoryAnswer, IResolverType } from "../../../type"
import arrayToMap from "../../utils/arrayToMap"
import getCriteria from "../../utils/getCriteria"
import { extractBearerToken, extractTokenUserMetadata } from "../../utils/token"
import { firestore } from "../../configs/firebase"
import { ECollection } from "../../../type/enum"
import { choices, criterias, questions } from "../data/question"

const choiceMap = arrayToMap(choices, "id")
const questionMap = arrayToMap(questions, "id")

export const Query: IResolverType = {
	questions: () => questions,
	adminGetHistoryAnswers: async () => {
		const res = await firestore
			.collection(ECollection.HISTORY_ANSWER)
			.orderBy("createdAt", "desc")
			.get()
		return res.docs.map((e) => e.data())
	},
}

interface SubmitQuestionInput {
	input: { answers: AnswerInput[]; isShare: boolean }
}
interface AnswerInput {
	questionId: string
	choiceId: string
}
export const Mutation: IResolverType = {
	submitQuestion: async (
		_,
		{ input }: SubmitQuestionInput,
		{ user, authorization }
	) => {
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

		const historyAnswersData: IHistoryAnswer = {
			id: v1(),
			userId,
			answers,
			score,
			criteria: criteria,
			isShare: !!input.isShare,
			createdAt: new Date(),
		}

		await firestore
			.collection(ECollection.HISTORY_ANSWER)
			.doc(historyAnswersData.id)
			.set(historyAnswersData)

		return historyAnswersData
	},
}

export const HistoryAnswer: IResolverType<IHistoryAnswer> = {
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
