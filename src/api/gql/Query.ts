import { gql } from "apollo-server-core"

export default gql`
	type Query {
		me: User!
		questions: [Question]!

		adminGetHistoryAnswers(sortInput: SortInput): [HistoryAnswer]!
		adminListAdminAccounts(sortInput: SortInput): [User]!
	}
`
