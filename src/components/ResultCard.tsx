import Link from "next/link"
import React, { FC } from "react"
import { IHistoryResult } from "../../type"
import { criterias } from "../api/data/question"
import { getCriteriaColor } from "../utils/getCriteria"
import { dateFormat, phoneNumberFormat } from "../utils/helpers"

interface Props {
	result: IHistoryResult
	showUserInfo?: boolean
	isAdmin?: boolean
}
const ResultCard: FC<Props> = (props) => {
	const userInfo = props.result.user && props.result.user
	return (
		<div
			className="flex flex-col gap-y-4 bg-white shadow-lg border-2 p-4 font-medium rounded-xl"
			style={{ borderColor: getCriteriaColor(criterias, props.result.score) }}
		>
			{props.showUserInfo && userInfo ? (
				<div className="flex justify-between">
					<span>{userInfo.fullName}</span>
					<span>{phoneNumberFormat(userInfo.telNumber)}</span>
				</div>
			) : (
				<p className="text-gray-400">ผู้ใช้ไม่ประสงค์ลงชื่อเข้าใช้</p>
			)}

			<div className="flex justify-between">
				<p>
					คะแนนที่ได้ <span>{props.result.score}</span>
				</p>
				<p>
					เกณฑ์ <span>ปานกลาง</span>
				</p>
			</div>

			<div className="flex justify-between items-center">
				<p className="text-sm">{dateFormat(props.result.createdAt)} น.</p>
				<Link href={props.isAdmin ?`/admin/result/${props.result.id}` :`/result/${props.result.id}`}>
					<a className="bg-main-blue-green text-white px-4 py-1 rounded-full hover:scale-110">
						ดูข้อมูล
					</a>
				</Link>
			</div>
		</div>
	)
}

export default ResultCard
