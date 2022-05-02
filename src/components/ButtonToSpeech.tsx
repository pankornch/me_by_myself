import { VolumeUpIcon } from "@heroicons/react/outline"
import { FC, useMemo } from "react"
import { useSpeechSynthesis } from "react-speech-kit"
import NoSSR from "./NoSSR"

interface Props {
	text: string
	children?: JSX.Element | JSX.Element[]
}

const ButtonToSpeech: FC<Props> = ({ text, children }) => {
	const { speak } = useSpeechSynthesis()

	const getVoice = (lang: string) => {
		const voices = window.speechSynthesis.getVoices()
		const voice = voices.find((v) => v.lang === lang)
		return voice
	}


	return (
		<div className="flex items-start gap-x-2">
			<button className="p-2" onClick={() => speak({ text, voice: getVoice("th-TH") })}>
				<VolumeUpIcon className="w-6 h-6 text-black" />
			</button>
			{children}
		</div>
	)
}

export default NoSSR(ButtonToSpeech) as FC<Props>
