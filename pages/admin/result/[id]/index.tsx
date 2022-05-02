import { useLazyQuery, useMutation } from "@apollo/client"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useMemo } from "react"
import {
	MUTATION_ADMIN_DELETE_HISTORY_RESULT,
	QUERY_ADMIN_GET_RESULT_BY_ID,
} from "../../../../src/gql"
import { ICriteria, IHistoryResult } from "../../../../type"
import getCriteriaData from "../../../../src/utils/getCriteria"
import { criterias } from "../../../../src/api/data/question"
import NavbarAccount from "../../../../src/components/NavbarAccount"
import ResultSection from "../../../../src/components/Result/ResultSection"
import AdviceSection from "../../../../src/components/Result/AdviceSection"
import { copyToClipboard, tailwindColors } from "../../../../src/utils/helpers"
import Input from "../../../../src/components/Input"
import NoSSR from "../../../../src/components/NoSSR"
import Question from "../../../../src/components/Question"
import WithAuth from "../../../../src/components/Auth/WithAuth"
import { EUserRole } from "../../../../type/enum"
import NotFoundLayout from "../../../../src/components/Layouts/NotFoundLayout"
import ResultNotFound from "../../../../src/components/Notfound/ResultNotFound"
import Layout from "../../../../src/components/Layouts"
import Swal from "sweetalert2"

const AdminResultByIdPage: NextPage = () => {
	const [getResultById, { data, loading }] = useLazyQuery(
		QUERY_ADMIN_GET_RESULT_BY_ID
	)

	const [deleteHistoryResult] = useMutation(
		MUTATION_ADMIN_DELETE_HISTORY_RESULT
	)

	const router = useRouter()

	useEffect(() => {
		if (!router.query.id) return
		getResultById({ variables: { id: router.query.id } })
	}, [router.query.id])

	const result = useMemo<IHistoryResult>(() => {
		if (!data) return {}
		return data.getResultById
	}, [loading, data])

	const getCriteria = useMemo<Partial<ICriteria>>(() => {
		return getCriteriaData(criterias, result.score) || {}
	}, [result])

	const shareUrl = `${location.protocol}//${location.host}/result/${router.query.id}`

	const handleDeleteResult = async () => {
		const { isConfirmed } = await Swal.fire({
			title: "ต้องการลบผลการประเมินนี้ ?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			confirmButtonColor: tailwindColors.main["blue-green"],
		})

		if (!isConfirmed) return

		try {
			await deleteHistoryResult({
				variables: {
					id: router.query.id,
				},
			})

			await Swal.fire({
				title: "ลบผลการประเมินนี้สำเร็จ",
				icon: "success",
				confirmButtonColor: tailwindColors.main["blue-green"],
				timer: 3000
			})

			router.replace("/admin")

		} catch (error) {
			await Swal.fire({
				title: "ลบผลการประเมินนี้ไม่สำเร็จ",
				text: "ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง",
				icon: "error",
				confirmButtonColor: tailwindColors.main["blue-green"],
				timer: 3000
			})
		}
	}

	if (loading) return <></>

	return (
		<Layout navbarType="ACCOUNT">
			<div className="pt-24 flex flex-col gap-y-12">
				<NavbarAccount />
				<NotFoundLayout
					isNotFound={!data}
					notFoundComponent={<ResultNotFound />}
				>
					<div className="flex justify-between items-end">
						<div className="flex flex-col items-start font-medium text-main-blue-green">
							<h5 className="mb-2">ข้อมูลผู้ใช้</h5>
							{result.user ? (
								<>
									<h6 className="max-w-[60vw] truncate">
										คุณ {result.user.fullName}
									</h6>
									<h6>เบอร์โทร {result.user.telNumber}</h6>
								</>
							) : (
								<h6>ผู้ใช้ไม่ประสงค์ลงชื่อเข้าใช้</h6>
							)}
						</div>

						<button
							onClick={handleDeleteResult}
							className="bg-main-red text-white px-4 py-2 rounded-full w-fit hover:scale-110 hover:shadow-lg"
						>
							ลบผลการประเมินนี้
						</button>
					</div>

					<ResultSection isAdmin result={result} />
					<div>
						<h6 className="font-semibold text-center mb-3">
							ข้อแนะนำในการดูแล
						</h6>
						<AdviceSection range={getCriteria.criteriaRange || ""} />
					</div>
					<div className="flex flex-col md:flex-row items-start md:items-end gap-2">
						<Input
							className="grow"
							label="แชร์ผลการประเมิน"
							defaultValue={shareUrl}
							readOnly
						/>
						<button
							onClick={() => copyToClipboard(shareUrl)}
							className="bg-main-blue-green text-white px-4 py-2 rounded-lg"
						>
							คัดลอกลิงก์
						</button>
					</div>
					<div className="px-4 pb-24">
						{result.answers?.map((answer) => (
							<Question
								key={answer.question.id}
								question={answer.question}
								selectedChoice={{ [answer.question.id]: answer.choiceId }}
								disabled
							/>
						))}
					</div>
				</NotFoundLayout>
			</div>
		</Layout>
	)
}

export default NoSSR(
	WithAuth(AdminResultByIdPage, [EUserRole.ADMIN, EUserRole.SUPER_ADMIN])
)
