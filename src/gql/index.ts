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

export const MUTATION_SUBMIT_ANSWER = gql`
	mutation submitAnswer($input: SubmitAnswerInput!) {
		submitAnswer(input: $input) {
			criteria
			score
			answers {
				choiceId
				questionId
			}
			isShare
		}
	}
`
