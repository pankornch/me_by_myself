import React, { FC } from "react"
import { IQuestion } from "../../type"
import combindClass from "../utils/combindClass"
import { VolumeUpIcon } from "@heroicons/react/outline"
import textToSpeech from "../utils/textToSpeech"
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

	return (
		<div
			className={combindClass(
				"border-b-2 border-b-main-grey py-4 duration-200",
				!selectedChoice[question.id] && "opacity-50"
			)}
		>
			<div className="flex items-center justify-center gap-x-2">
				<VolumeUpIcon
					className="w-4 h-4 cursor-pointer"
					onClick={() => textToSpeech(question.title)}
				/>
				<p className="text-lg font-semibold">{question.title}</p>
			</div>

			<div className="flex justify-between items-center mt-4">
				<div
					onClick={() =>
						handleSelectedChoice(question.id, question.choices[0].id)
					}
				>
					<div className="w-16 h-16 rounded-full bg-main-blue-green flex items-center justify-center group cursor-pointer">
						{selectedChoice[question.id] === question.choices[0].id ? (
							<div className="text-4xl">😃</div>
						) : (
							<div
								className={combindClass(
									"text-4xl opacity-0 duration-200 ease-in-out",
									!disabled && "group-hover:opacity-75"
								)}
							>
								😃
							</div>
						)}
					</div>
				</div>
				<div
					onClick={() =>
						handleSelectedChoice(question.id, question.choices[1].id)
					}
				>
					<div className="w-12 h-12 rounded-full bg-main-green-light flex items-center justify-center group cursor-pointer">
						{selectedChoice[question.id] === question.choices[1].id ? (
							<div className="text-4xl">🙂</div>
						) : (
							<div
								className={combindClass(
									"text-4xl opacity-0 duration-200 ease-in-out",
									!disabled && "group-hover:opacity-75"
								)}
							>
								🙂
							</div>
						)}
					</div>
				</div>
				<div
					onClick={() =>
						handleSelectedChoice(question.id, question.choices[2].id)
					}
				>
					<div className="w-12 h-12 rounded-full bg-main-red-light flex items-center justify-center group cursor-pointer">
						{selectedChoice[question.id] === question.choices[2].id ? (
							<div className="text-4xl">😟</div>
						) : (
							<div
								className={combindClass(
									"text-4xl opacity-0 duration-200 ease-in-out",
									!disabled && "group-hover:opacity-75"
								)}
							>
								😟
							</div>
						)}
					</div>
				</div>
				<div
					onClick={() =>
						!disabled &&
						handleSelectedChoice(question.id, question.choices[3].id)
					}
				>
					<div className="w-16 h-16 rounded-full bg-main-red flex items-center justify-center group cursor-pointer">
						{selectedChoice[question.id] === question.choices[3].id ? (
							<div className="text-4xl">😡</div>
						) : (
							<div
								className={combindClass(
									"text-4xl opacity-0 duration-200 ease-in-out",
									!disabled && "group-hover:opacity-75"
								)}
							>
								😡
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex justify-between mt-2">
				<span className="text-main-blue-green">เห็นด้วยอย่างยิ่ง</span>
				<span className="text-main-red">ไม่เห็นด้วยอย่างยิ่ง</span>
			</div>
		</div>
	)
}

export default Question
