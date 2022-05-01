import { gql } from "apollo-server-core"

export default gql`
	input CreateUserInput {
		telNumber: String!
		firstName: String!
		lastName: String!
		password: String!
	}

	input LoginInput {
		telNumber: String!
		password: String!
	}

	input SubmitAnswerInput {
		answers: [AnswerInput!]!
	}

	input AnswerInput {
		questionId: ID!
		choiceId: ID!
	}

	input SortInput {
		type: SortType!
		orderBy: String!
	}

	enum SortType {
		ASC
		DESC
	}
`
