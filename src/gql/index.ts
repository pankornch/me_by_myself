import { gql } from "apollo-server-core"

export const QUERY_QUESTIONS = gql`
	query {
		questions {
			id
			title
			choices {
				id
				title
			}
		}
	}
`

export const QUERY_GET_RESULT_BY_ID = gql`
	query getResultById($id: ID!) {
		getResultById(id: $id) {
			id
			score
			userId
			criteria
			
		}
	}
`

export const QUERY_ADMIN_GET_RESULT_BY_ID = gql`
	query getResultById($id: ID!) {
		getResultById(id: $id) {
			score
			userId
			user {
				telNumber
				fullName
			}
			criteria
			answers {
				question {
					title
					id
					choices {
						id
						title
					}
				}
				choiceId
			}
		}
	}
`

export const QUERY_GET_MY_HISTORY_RESULTS = gql`
	query me($sortInput: SortInput) {
		me {
			historyResults(sortInput: $sortInput) {
				id
				score
				createdAt
				criteria
				user {
					fullName
					telNumber
				}
			}
		}
	}
`

export const QUERY_ADMIN_GET_HISTORY_RESULTS = gql`
	query adminGetHistoryResults($sortInput: SortInput) {
		adminGetHistoryResults(sortInput: $sortInput) {
			id
			score
			createdAt
			criteria
			user {
				fullName
				telNumber
			}
		}
	}
`

export const QUERY_ADMIN_LIST_ADMIN_ACCOUNTS = gql`
	query adminListAdminAccounts($sortInput: SortInput) {
		adminListAdminAccounts(sortInput: $sortInput) {
			id
			telNumber
			fullName
			role
		}
	}
`

export const MUTATION_SUBMIT_ANSWER = gql`
	mutation submitAnswer($input: SubmitAnswerInput!) {
		submitAnswer(input: $input) {
			id
		}
	}
`

export const MUTATIOB_CREATE_USER = gql`
	mutation createUser($input: CreateUserInput!) {
		createUser(input: $input) {
			token
		}
	}
`

export const MUTATION_LOGIN = gql`
	mutation login($input: LoginInput!) {
		login(input: $input) {
			token
		}
	}
`

export const MUTATION_REFRESH_TOKEN = gql`
	mutation {
		refreshToken {
			token
		}
	}
`

export const MUTATION_UPDATE_USER = gql`
	mutation updateUser($input: UpdateUserInput!) {
		updateUser(input: $input) {
			id
		}
	}
`

export const MUTATION_ADMIN_CREATE_ADMIN_ACCOUNT = gql`
	mutation adminCreateAdminAccount($input: CreateUserInput!) {
		adminCreateAdminAccount(input: $input) {
			id
		}
	}
`

export const MUTATION_ADMIN_DELETE_ADMIN_ACCOUNT = gql`
	mutation adminDeleteAdminAccount($userId: ID!){
		adminDeleteAdminAccount(userId: $userId)
	}
`

export const MUTATION_ADMIN_DELETE_HISTORY_RESULT = gql`
	mutation adminDeleteHistoryResult($id: ID!) {
		adminDeleteHistoryResult(id: $id)
	}
`