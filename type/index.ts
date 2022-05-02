import { EUserRole } from "./enum"

export interface IUser {
	id: string
	telNumber: string
	firstName: string
	lastName: string
	fullName?: string
	password: string
	role: EUserRole
	createdAt: Date
	historyResults?: IHistoryResult[]
}

export interface IQuestion {
	id: string
	title: string
	choices: IChoice[]
}

export interface IChoice {
	id: string
	title: string
	score: number
}

export interface IHistoryResult {
	id: string
	userId: string | null
	user?: IUser
	isShare: boolean
	score: number
	createdAt: Date
	criteria: string
	answers: IAnswer[]
}

export interface IAnswer {
	questionId: string
	question: IQuestion
	choiceId: string
	choice: IChoice
}

export interface IContext {
	authorization: string
	user?: IUser
}

export type IResolver<P = any, A = any> = (
	parent: P,
	args: A,
	context: IContext,
	info: any
) => any

type x = { a: number; b: number }

type e = keyof x

export interface IResolverType<P = any> {
	[key: string | e]: IResolverMap<P> | IResolver<P> | IResolverType<P>
}

interface IResolverMap<P> {
	[key: string]: IResolver<P>
}

export interface ICriteria {
	range: {
		start: number
		end: number
	}
	criteria: string
	criteriaRange: string
	title: string
}
