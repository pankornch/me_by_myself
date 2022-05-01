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
