import { VolumeUpIcon } from "@heroicons/react/outline"
import { FC } from "react"
import textToSpeech from "../utils/textToSpeech"

interface Props {
	text: string
	children?: JSX.Element | JSX.Element[]
}

const ButtonToSpeech: FC<Props> = ({ text, children }) => {
	return (
		<div className="flex items-start gap-x-2">
			<button className="p-2" onClick={() => textToSpeech(text)}>
				<VolumeUpIcon className="w-6 h-6 text-black" />
			</button>
			{children}
		</div>
	)
}

export default ButtonToSpeech
