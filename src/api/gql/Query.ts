import { gql } from "apollo-server-core"

export default gql`
	type Query {
		me: User!
		questions: [Question]!

		adminGetHistoryResults(sortInput: SortInput): [HistoryResult]!
		adminListAdminAccounts(sortInput: SortInput): [User]!

		getResultById(id: ID!): HistoryResult!
	}
`
