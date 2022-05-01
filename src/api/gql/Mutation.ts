import { gql } from "apollo-server-core"

export default gql`
	type Mutation {
		createUser(input: CreateUserInput!): AuthResponse!
		login(input: LoginInput!): AuthResponse!

		submitQuestion(input: SubmitQuestionInput!): HistoryAnswer!

		adminCreateAdminAccount(input: CreateUserInput!): User!
		adminDeleteAdminAccount(userId: ID!): String
		adminDeleteHistoryAnswer(id: ID!): String
	}
`