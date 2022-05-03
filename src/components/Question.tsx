import React, { FC } from "react"
import { IQuestion } from "../../type"
import combindClass from "../utils/combindClass"
import ButtonToSpeech from "./ButtonToSpeech"
interface Props {
	question: IQuestion
	onSelected?: (value: Record<string, string>) => void
	selectedChoice: Record<string, string>
	disabled?: boolean
}

const Question: FC<Props> = ({
	question,
	onSelected,
	selectedChoice,
	disabled,
}) => {
	const handleSelectedChoice = (questionId: string, choiceId: string) => {
		if (disabled) return
		onSelected?.call(this, { [questionId]: choiceId })
	}

	const choiceStyles = [
		{ color: "bg-main-blue-green", emoji: "😃" },
		{ color: "bg-main-green-light", emoji: "🙂" },
		{ color: "bg-main-red-light", emoji: "😟" },
		{ color: "bg-main-red", emoji: "😡" },
	]

	return (
		<div
			className={combindClass(
				"border-b-2 border-b-main-grey py-4 duration-200",
				!selectedChoice[question.id] && "opacity-50"
			)}
		>
			<div className="flex items-center justify-center gap-x-2">
				<ButtonToSpeech text={question.title} />
				<p className="text-lg font-semibold">{question.title}</p>
			</div>

			<div className="flex justify-between items-center mt-4">
				{question.choices.map((choice, index) => (
					<div
						key={index}
						onClick={() =>
							!disabled &&
							handleSelectedChoice(question.id, question.choices[index].id)
						}
						className="flex flex-col items-center gap-y-3"
					>
						<div
							className={combindClass(
								"w-16 h-16 rounded-full flex items-center justify-center group cursor-pointer",
								choiceStyles[index].color
							)}
						>
							{selectedChoice[question.id] === question.choices[index].id ? (
								<div className="text-4xl">{choiceStyles[index].emoji}</div>
							) : (
								<div
									className={combindClass(
										"text-4xl opacity-0 duration-200 ease-in-out",
										!disabled && "group-hover:opacity-75"
									)}
								>
									{choiceStyles[index].emoji}
								</div>
							)}
						</div>
						<p className="text-[10px] sm:text-sm md:text-base">
							{choice.title}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Question
