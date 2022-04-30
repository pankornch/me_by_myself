import { gql } from "apollo-server-core"

export default gql`
	type User {
		id: ID
		telNumber: String!
		firstName: String!
		lastName: String!
		fullName: String!
		role: String!
		createdAt: Date!
		historyAnswers: [HistoryAnswer]!
	}

	type Question {
		id: ID!
		title: String!
		choices: [Choice]!
	}

	type Choice {
		id: ID!
		title: String!
		score: Float!
	}

	type HistoryAnswer {
		id: ID!
		userId: ID
		user: User
		score: Float!
		criteria: String!
		createdAt: Date!
		isShare: Boolean!
		answers: [Answer!]
	}

	type Answer {
		questionId: ID!
		question: Question!
		choiceId: ID!
		choice: Choice!
	}

	type AuthResponse {
		token: String!
		user: User!
	}

	scalar Date
`
