import { useLazyQuery } from "@apollo/client"
import { useRouter } from "next/router"
import React, { useEffect, useMemo } from "react"
import { QUERY_GET_RESULT_BY_ID } from "../../../src/gql"

import NoSSR from "../../../src/components/NoSSR"
import { ICriteria, IHistoryResult } from "../../../type"
import { criterias } from "../../../src/api/data/question"
import Navbar from "../../../src/components/Navbar"
import getCriteriaData from "../../../src/utils/getCriteria"
import ResultSection from "../../../src/components/Result/ResultSection"
import AdviceSection from "../../../src/components/Result/AdviceSection"
import { NextPage } from "next"
import Input from "../../../src/components/Input"
import { copyToClipboard } from "../../../src/utils/helpers"
import NotFoundLayout from "../../../src/components/Layouts/NotFoundLayout"
import ResultNotFound from "../../../src/components/Notfound/ResultNotFound"
import Layout from "../../../src/components/Layouts"

const ResultByIdPage: NextPage = () => {
	const [getResultById, { data, loading }] = useLazyQuery(
		QUERY_GET_RESULT_BY_ID
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

	const shareUrl = `${location.protocol}//${location.host}${router.asPath}`

	if (loading) return <></>

	return (
		<Layout navbarType="HOME">
			<div
			className="flex flex-col gap-y-12">
			
				<NotFoundLayout isNotFound={!data} notFoundComponent={<ResultNotFound />}>
					<ResultSection result={result} />
					<div>
						<h6 className="font-semibold text-center mb-3">ข้อแนะนำในการดูแล</h6>
						<AdviceSection range={getCriteria.criteriaRange || ""} />
					</div>
					<div className="flex flex-col md:flex-row items-start md:items-end gap-2">
						<Input
							className="grow"
							label="แชร์ผลการประเมินของคุณ"
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
					<div>
						<h6 className="font-semibold mb-3">หมายเหตุ</h6>
						<div className="flex flex-col gap-y-6 ml-4">
							<p>
								<b>เกณฑ์ระดับต่ำ</b> คือ มีความรู้สึกมีคุณค่าในตนเองต่ำ
							</p>
							<p>
								<b>เกณฑ์ระดับปานกลาง</b> คือ มีความรู้สึกมีคุณค่าในตนเองปานกลาง
							</p>
							<p>
								<b>เกณฑ์ระดับสูง</b> คือ มีความรู้สึกมีคุณค่าในตนเองสูง
							</p>
							<p>
								แบบประเมินนี้พัฒนาจากคู่มือการป้องกันการดื่มแอลกอฮอล์ในวัยรุ่น
								ของโรเซนเบิร์ก การประเมินนี้เป็นการประเมินวัดคุณค่าในตนเอง
								ส่วนการวินิจฉัยนั้นจำเป็นต้องพบแพทย์เพื่อซักประวัติ ตรวจร่างกาย
								รวมถึงส่งตรวจเพิ่มเติมที่จำเป็น เพื่อยืนยันการวินิจฉัยที่แน่นอน
								รวมถึงเพื่อแยกโรคหรือภาวะอื่น ๆ
								เนื่องจากการประเมินคุณค่าในตนเองเป็นจากสาเหตุต่าง ๆ ได้มากมาย เช่น
								โรคทางจิตเวชอื่นที่มีอาการซึมเศร้าร่วมด้วย
								โรคทางร่างกายเช่นโรคไทรอยด์ โรคแพ้ภูมิตัวเอง
								หรือเป็นจากยาหรือสารต่าง ๆ
								ผลการประเมินและคำแนะนำที่ได้รับจากโปรแกรมนี้จึงไม่สามารถใช้แทนการตัดสินใจของแพทย์ได้
								การตรวจรักษาเพิ่มเติมหรือการให้ยารักษาขึ้นอยู่กับดุลยพินิจของแพทย์และการปรึกษากันระหว่างแพทย์และตัวท่าน
							</p>
							<p>
								ผลการประเมินและคำแนะนำที่ได้รับจากโปรแกรมนี้จึงไม่สามารถใช้แทนการตัดสินใจของแพทย์ได้
								การตรวจรักษาเพิ่มเติมหรือการให้ยารักษาขึ้นอยู่กับดุลยพินิจของแพทย์และการปรึกษากันระหว่างแพทย์และตัวท่าน
							</p>
						</div>
					</div>
				</NotFoundLayout>
			</div>
		</Layout>
	)
}

export default NoSSR(ResultByIdPage)
