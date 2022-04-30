export interface IUser {
	id: string
	telNumber: string
	firstName: string
	lastName: string
	password: string
	role: "USER" | "ADMIN" | "SUER_ADMIN"
	createdAt: Date
	answers?: Answer[]
}

export interface IQuestion {
	id: string
	title: string
	choices: IChoice[]
}

export interface IChoice {
	title: string
	score: number
}

export interface Answer {
	id: string
	userId?: string
	user?: IUser
	questionId: string
	question: IQuestion
	createdAt: string
	isShare: boolean
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

export interface IResolverType<P = any> {
	[key: string]: IResolverMap<P> | IResolver<P> | IResolverType<P>
}

interface IResolverMap<P> {
	[key: string]: IResolver<P>
}
