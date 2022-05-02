import { ICriteria } from "../../type"
import { tailwindColors } from "../utils/helpers"

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

export const getCriteriaColor = (
	criteria: ICriteria[],
	score: number
): string => {
	let _criteria: any
	for (const c of criteria) {
		if (score >= c.range.start && score <= c.range.end) {
			_criteria = c
			break
		}
	}
	if (!_criteria) return tailwindColors.main["red"]
	if (_criteria.criteriaRange === "สูง")
		return tailwindColors.main["blue-green"]
	else if (_criteria.criteriaRange === "ปานกลาง")
		return tailwindColors.main["green-light"]
	else return tailwindColors.main["red"]
}
