import { FC } from "react"
import { IHistoryResult } from "../../../type"
import { criterias } from "../../api/data/question"
import getCriteriaData, { getCriteriaColor } from "../../utils/getCriteria"
import ButtonToSpeech from "../ButtonToSpeech"

interface Props {
	result: IHistoryResult
	isAdmin?: boolean
}
const ResultSection: FC<Props> = (props) => {
	const getCriterialColor = getCriteriaColor(criterias, props.result.score)
	const getCriteria = getCriteriaData(criterias, props.result.score)
	return (
		<>
			<div
				className="flex flex-col items-center p-4 rounded-xl shadow-lg"
				style={{
					backgroundColor: getCriterialColor,
				}}
			>
				<ButtonToSpeech text={`รวมคะแนน ${props.result.score} คะแนน ท่าน${props.result.criteria}`}>
					<div className="flex flex-col items-center">
						<h5>รวมคะแนน {props.result.score}</h5>
						<h5>
							{props.isAdmin
								? getCriteria?.title?.replace(
										"ระดับคะแนนของคุณอยู่ในช่วง",
										"ระดับคะแนนอยู่ในช่วง"
								  )
								: getCriteria?.title}
						</h5>
					</div>
				</ButtonToSpeech>
			</div>

			<div className="flex flex-col items-center gap-y-6">
				<h6 className="font-semibold">ผลการประเมิน</h6>
				<ButtonToSpeech text={props.result.criteria}>
					<p className="mt-2">
						{props.isAdmin
							? "มีความรู้สึกเห็นคุณค่าในตนเอง"
							: "ท่านมีความรู้สึกเห็นคุณค่าในตนเอง"}
						<span
							className="font-semibold ml-2"
							style={{ color: getCriterialColor }}
						>
							{getCriteria?.criteriaRange}
						</span>
					</p>
				</ButtonToSpeech>
			</div>
		</>
	)
}

export default ResultSection
