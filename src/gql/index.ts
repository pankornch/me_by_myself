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
			isAnonymous
			userId
			criteria
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