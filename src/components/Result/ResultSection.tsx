import { FC } from "react"
import { IHistoryResult } from "../../../type"
import { criterias } from "../../api/data/question"
import getCriteriaData, { getCriteriaColor } from "../../utils/getCriteria"

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
				className="flex flex-col items-center p-2 rounded-xl"
				style={{
					backgroundColor: getCriterialColor,
				}}
			>
				<h5>รวมคะแนน {props.result.score}</h5>
				<h5>{props.isAdmin ?  getCriteria?.title?.replace("ระดับคะแนนของคุณอยู่ในช่วง", "ระดับคะแนนอยู่ในช่วง") : getCriteria?.title}</h5>
			</div>
			<div className="flex justify-center gap-x-6 font-semibold">
				<div className="flex flex-col items-center">
					<div className="w-16 h-16 rounded-full bg-main-red mb-2" />
					<div>ต่ำ</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-16 h-16 rounded-full bg-main-green-light mb-2" />
					<div>ปานกลาง</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-16 h-16 rounded-full bg-main-blue-green mb-2" />
					<div>สูง</div>
				</div>
			</div>

			<div className="flex flex-col items-center gap-y-6">
				<h6 className="font-semibold">ผลการประเมิน</h6>
				<p>
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
			</div>
		</>
	)
}

export default ResultSection
