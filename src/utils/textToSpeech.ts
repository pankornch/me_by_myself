let isPlayed: boolean = false

export default function textToSpeech(text: string) {
	if (isPlayed) return

	const speech = new SpeechSynthesisUtterance(text)
	speech.lang = "TH"
	speech.rate = 0.8

	isPlayed = true

	speech.addEventListener("end", () => {
		isPlayed = false
	})

	window.speechSynthesis.speak(speech)
}
