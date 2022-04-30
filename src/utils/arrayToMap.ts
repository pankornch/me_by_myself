export default function arrayToMap(array: Record<any, any>[], key: string) {
	const map: Record<any, any> = {}

	for (const e of array) {
		map[e[key]] = e
	}

	return map
}
