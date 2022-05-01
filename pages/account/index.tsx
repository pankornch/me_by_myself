import { useLazyQuery, useQuery } from "@apollo/client"
import { NextPage } from "next"
import React, { useEffect, useMemo, useState } from "react"
import NoSSR from "../../src/components/NoSSR"
import ResultCard from "../../src/components/ResultCard"
import Select from "../../src/components/Select"
import { QUERY_GET_MY_HISTORY_RESULTS } from "../../src/gql"
import useUser from "../../src/hooks/useUser"
import { IHistoryResult } from "../../type"
import { ChevronUpIcon } from "@heroicons/react/outline"
import { UserCircleIcon } from "@heroicons/react/solid"
import combindClass from "../../src/utils/combindClass"
import Link from "next/link"
import NavbarAccount from "../../src/components/NavbarAccount"

const AccountPage: NextPage = () => {
	const [user] = useUser()
	const [getMyHistoryResult, { data, loading }] = useLazyQuery(
		QUERY_GET_MY_HISTORY_RESULTS,
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

	const toggleSortType = () =>
		setSortType((prev) => (prev === "ASC" ? "DESC" : "ASC"))

	const sortOrderBySelection = [
		{ text: "ล่าสุด", value: "createdAt" },
		{ text: "คะแนน", value: "score" },
	]

	const myHistoryResults = useMemo<IHistoryResult[]>(() => {
		if (!data) return []
		return data.me.historyResults
	}, [data])

	useEffect(() => {
		getMyHistoryResult({
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

			<div className="flex items-center justify-end mb-6 gap-x-3">
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

			{loading ? (
				<></>
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{myHistoryResults.map((result) => (
						<ResultCard key={result.id} showUserInfo result={result} />
					))}
				</div>
			)}
		</div>
	)
}

export default NoSSR(AccountPage)
