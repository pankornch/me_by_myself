import { useLazyQuery } from "@apollo/client"
import { NextPage } from "next"
import React, { useEffect, useMemo, useState } from "react"
import NoSSR from "../../src/components/NoSSR"
import ResultCard from "../../src/components/ResultCard"
import Select from "../../src/components/Select"
import { QUERY_ADMIN_GET_HISTORY_RESULTS } from "../../src/gql"
import { IHistoryResult } from "../../type"
import { ChevronUpIcon } from "@heroicons/react/outline"
import combindClass from "../../src/utils/combindClass"
import NavbarAccount from "../../src/components/NavbarAccount"
import WithAuth from "../../src/components/Auth/WithAuth"
import { EUserRole } from "../../type/enum"

const AdminIndexPage: NextPage = () => {
	const [getHistoryResult, { data, loading }] = useLazyQuery(
		QUERY_ADMIN_GET_HISTORY_RESULTS,
		{
			fetchPolicy: "network-only",
			variables: {
				sortInput: {
					type: "ASC",
					orderBy: "score",
				},
			},
		}
	)

	const [selectedOrderBy, setSelectedOrderBy] = useState<string>("createdAt")
	const [sortType, setSortType] = useState<string>("DESC")

	const [isShowAnonymous, setIsShowAnonymous] = useState<boolean>(true)

	const toggleSortType = () =>
		setSortType((prev) => (prev === "ASC" ? "DESC" : "ASC"))

	const sortOrderBySelection = [
		{ text: "ล่าสุด", value: "createdAt" },
		{ text: "คะแนน", value: "score" },
	]

	const historyResults = useMemo<IHistoryResult[]>(() => {
		if (!data) return []

		if (isShowAnonymous) return data.adminGetHistoryResults

		return (data.adminGetHistoryResults as IHistoryResult[]).filter(
			(e) => e.user
		)
	}, [data, isShowAnonymous])

	useEffect(() => {
		getHistoryResult({
			variables: {
				sortInput: {
					orderBy: selectedOrderBy,
					type: sortType,
				},
			},
			fetchPolicy: "network-only",
		})
	}, [selectedOrderBy, sortType])

	return (
		<div className="px-4 py-12 pt-32 md:px-24 lg:px-48">
			<NavbarAccount />

			<div className="flex flex-col lg:flex-row items-start sm:items-center justify-between mb-6 gap-y-3 border-b-2 pb-3">
				<div className="flex items-center gap-x-2">
					<input
						id="show-anonymous"
						type="checkbox"
						checked={isShowAnonymous}
						onChange={(e) => setIsShowAnonymous(e.target.checked)}
					/>
					<label htmlFor="show-anonymous">ผู้ใช้ไม่ประสงค์ลงชื่อเข้าใช้</label>
				</div>

				<p>ผลการประเมินทั้งหมด ({loading ? "..." : historyResults.length})</p>

				<div className="flex items-center gap-x-3">
					<p>เรียงข้อมูลตาม</p>
					<Select
						className="w-24"
						options={sortOrderBySelection}
						value={selectedOrderBy}
						onChangeValue={setSelectedOrderBy}
					/>
					<button onClick={toggleSortType} className="p-3 select-none">
						<ChevronUpIcon
							className={combindClass(
								"w-6 h-6",
								sortType === "DESC" ? "rotate-180" : "rotate-0"
							)}
						/>
					</button>
				</div>
			</div>

			{loading ? (
				<h4 className="font-medium text-center text-main-blue-green animate-bounce mt-3">
					กำลังโหลดข้อมูล ...
				</h4>
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{historyResults.map((result) => (
						<ResultCard key={result.id} showUserInfo isAdmin result={result} />
					))}
				</div>
			)}
		</div>
	)
}

export default NoSSR(
	WithAuth(AdminIndexPage, [EUserRole.ADMIN, EUserRole.SUPER_ADMIN])
)
