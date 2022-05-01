export interface LoginInput {
	input: {
		telNumber: string
		password: string
	}
}

export interface CreateUserInput {
	input: {
		telNumber: string
		firstName: string
		lastName: string
		password: string
	}
}

export interface SubmitAnswerInput {
	input: { answers: AnswerInput[]; isShare: boolean }
}

export interface AnswerInput {
	questionId: string
	choiceId: string
}

export interface SortInput {
	type: ESortType
	orderBy: string
}

export enum ESortType {
	ASC = "asc",
	DESC = "desc",
}
