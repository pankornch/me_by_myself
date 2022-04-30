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
`
