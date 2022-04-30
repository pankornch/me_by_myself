import { ICriteria } from "../../type"

export default function getCriteria(
	criteria: ICriteria[],
	score: number
): string {
	for (const c of criteria) {
		if (score >= c.range.start && score <= c.range.end) {
			return c.criteria
		}
	}

	return ""
}
