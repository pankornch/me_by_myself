import { VolumeUpIcon } from "@heroicons/react/outline"
import { FC } from "react"
import { useSpeechSynthesis } from "react-speech-kit"
import NoSSR from "./NoSSR"

interface Props {
	text: string
	children?: JSX.Element | JSX.Element[]
}

const ButtonToSpeech: FC<Props> = ({ text, children }) => {
	const { speak } = useSpeechSynthesis()
	return (
		<div className="flex items-start gap-x-2">
			<button
				className="p-2"
				onClick={() =>
					speak({ text, voice: window.speechSynthesis.getVoices()[16] })
				}
			>
				<VolumeUpIcon className="w-6 h-6 text-black" />
			</button>
			{children}
		</div>
	)
}

export default NoSSR(ButtonToSpeech) as FC<Props>
