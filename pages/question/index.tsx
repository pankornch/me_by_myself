import { useMutation } from "@apollo/client"
import { NextPage } from "next"
import React, { useMemo, useRef, useState } from "react"
import Question from "../../src/components/Question"
import { MUTATION_SUBMIT_ANSWER, QUERY_QUESTIONS } from "../../src/gql"
import { IQuestion } from "../../type"
import { PaperAirplaneIcon, CloudDownloadIcon } from "@heroicons/react/outline"
import client from "../../src/configs/apolloClient"
import Swal from "sweetalert2"
import { useRouter } from "next/router"
import { tailwindColors } from "../../src/utils/helpers"
import Layout from "../../src/components/Layouts"

interface Props {
	questions: IQuestion[]
}

const QuestionPage: NextPage<Props> = ({ questions }) => {
	const [selectedChoice, setSelectedChoice] = useState<Record<string, string>>(
		{}
	)

	const [submitAnswer, { loading: submitLoading }] = useMutation(
		MUTATION_SUBMIT_ANSWER
	)

	const router = useRouter()

	const progressCount = useMemo(() => {
		return Object.keys(selectedChoice).length
	}, [selectedChoice])

	const isSubmitRef = useRef<boolean>(false)

	const handleSubmit = async () => {
		const { isConfirmed } = await Swal.fire({
			title: "ต้องการส่งแบบประเมิน ?",
			showCancelButton: true,
			confirmButtonText: "ส่ง",
			confirmButtonColor: tailwindColors.main["blue-green"],
			cancelButtonText: "ยกเลิก",
		})

		if (isSubmitRef.current || !isConfirmed) return

		isSubmitRef.current = false

		const submitData = {
			answers: Object.entries(selectedChoice).map(([k, v]) => ({
				questionId: k,
				choiceId: v,
			})),
		}
		const res = await submitAnswer({ variables: { input: submitData } })

		if (res.errors) {
			Swal.fire({
				title: "เกิดข้อผิดพลาด",
				text: `เกิดข้อผิดพลาดในการส่งคำตอบ (error: ${res.errors.map(
					(e) => e.message
				)})`,
				timer: 3000,
				icon: "error",
			})
			console.error(res.errors)
		} else {
			router.push(`/result/${res.data.submitAnswer.id}`)
		}

		setSelectedChoice({})
	}

	return (
		<Layout navbarType="HOME">
			<div className="md:px-24 lg:px-48">
				<div className="bg-main-blue-green w-full p-6 pt-12 text-white rounded-b-[2.65rem] shadow-lg">
					<h4 className="text-[1.8rem] font-semibold mb-4 text-center">
						แบบประเมินคุณค่าในตนเอง
					</h4>
					<p className="text-xs">
						การเห็นคุณค่าในตนเอง คือ การที่มองตัวเอง และ ประเมินว่า ตัวเรานั้นมี
						คุณค่า คสามสารมารถ ความสำคัญ
						และได้รับความยินยอมรับจากคนรอบข้างเป็นอย่างไร เรามาสำรวจกันดีไหม
						ว่าเราเป็นบุคคลที่เห็นคุณค่าในตนเองหรือไม่ อย่างไร
						ลองตอบคำถามเกี่ยวกับความรู้สึกมีคุณค่าในตนเองดู
						โดยเลือกข้อความที่ตรงกับความรู้สึกตัวเองมากที่สุด
					</p>
				</div>
				<div className="px-4 pb-24">
					{questions.map((question) => (
						<Question
							key={question.id}
							question={question}
							onSelected={(value) => {
								setSelectedChoice({ ...selectedChoice, ...value })
							}}
							selectedChoice={selectedChoice}
						/>
					))}
				</div>
				<div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-main-blue-green w-56 text-center p-3 rounded-xl text-white font-semibold shadow-xl">
					{progressCount !== questions.length ? (
						<span>
							ท่านทำไปแล้ว {progressCount} / {questions.length} ข้อ
						</span>
					) : (
						<button
							disabled={submitLoading}
							className="w-full flex items-center justify-center gap-x-4 hover:scale-105 duration-200 disabled:cursor-wait"
							onClick={handleSubmit}
						>
							ส่งคำตอบ
							{submitLoading ? (
								<CloudDownloadIcon className="w-6 h-6 animate-bounce" />
							) : (
								<PaperAirplaneIcon className="w-6 h-6 rotate-90" />
							)}
						</button>
					)}
				</div>
			</div>
		</Layout>
	)
}

export const getServerSideProps = async () => {
	const { data } = await client.query({ query: QUERY_QUESTIONS })
	return {
		props: {
			questions: data.questions,
		},
	}
}

export default QuestionPage
