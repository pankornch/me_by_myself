export default function combindClass(...classes: any[]) {
	return classes.filter((e) => typeof e === "string").join(" ")
}
