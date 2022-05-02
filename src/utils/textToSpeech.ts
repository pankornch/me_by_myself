// @ts-nocheck
let isPlayed: boolean = false

export default function textToSpeech(text: string) {
	if (isPlayed) return

	const SpeechSynthesisUtterance =
		window.webkitSpeechSynthesisUtterance ||
		window.mozSpeechSynthesisUtterance ||
		window.msSpeechSynthesisUtterance ||
		window.oSpeechSynthesisUtterance ||
		window.SpeechSynthesisUtterance

	if (SpeechSynthesisUtterance !== undefined) {
		const voice = window.speechSynthesis.getVoices()[16]
		const speech = new SpeechSynthesisUtterance(text)
		speech.lang = voice.lang
		speech.rate = 0.8

		isPlayed = true

		speech.addEventListener("end", () => {
			isPlayed = false
		})

		window.speechSynthesis.speak(speech)
	} else {
		console.warn("sorry not supported 😭")
	}
}
