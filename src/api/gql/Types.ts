import { gql } from "apollo-server-core"

export default gql`
	type User {
		id: ID
		telNumber: String!
		firstName: String!
		lastName: String!
		role: String!
		createdAt: Date!
		answers: [Answer]!
	}

	type Question {
		id: ID!
		title: String!
		choices: [Choice]!
	}

	type Choice {
		title: String
		score: Float
	}

	type Answer {
		id: ID!
		userId: ID
		user: User
		questionId: ID!
		question: Question!
		score: Float!
		criteria: String!
		createdAt: Date!
		isShare: Boolean!
	}

	type AuthResponse {
		token: String!
		user: User!
	}

	scalar Date
`
