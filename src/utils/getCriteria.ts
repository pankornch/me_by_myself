import { ICriteria } from "../../type"

export default function getCriteria(
	criteria: ICriteria[],
	score: number
): ICriteria | null {
	for (const c of criteria) {
		if (score >= c.range.start && score <= c.range.end) {
			return c
		}
	}

	return null
}


export const getCriteriaColor = (criteria: ICriteria[],score: number) => {
	let _criteria: any
	for (const c of criteria) {
		if (score >= c.range.start && score <= c.range.end) {
			_criteria = c
			break
		}
	}

	console.log(_criteria)

	if (_criteria.criteriaRange === "สูง") return "#20A2A0"
	else if (_criteria.criteriaRange === "ปานกลาง") return "#A2E1DB"
	else return "#EC4C38"
}