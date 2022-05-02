import { gql } from "apollo-server-core"

export default gql`
	type Mutation {
		createUser(input: CreateUserInput!): AuthResponse!
		updateUser(input: UpdateUserInput!): User!
		login(input: LoginInput!): AuthResponse!

		submitAnswer(input: SubmitAnswerInput!): HistoryResult!

		adminCreateAdminAccount(input: CreateUserInput!): User!
		adminDeleteAdminAccount(userId: ID!): String
		adminDeleteHistoryResult(id: ID!): String

		refreshToken: AuthResponse!
	}
`
