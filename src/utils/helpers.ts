export const dateFormat = (date: Date | string | number) => {
	const dateFormat = new Intl.DateTimeFormat("th", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(date))

	return dateFormat
}

export const phoneNumberFormat = (phoneNumber: string) => {
	// 099-999-9999
	let format: string = ""

	const insertAt = [2, 5]

	for (let i = 0; i < phoneNumber.length; i++) {
		format += phoneNumber[i]
		if (insertAt.includes(i)) format += "-"
	}

    return format
}
