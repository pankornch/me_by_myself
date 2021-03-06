import { IChoice, ICriteria, IQuestion } from "../../../type"

export const choices: IChoice[] = [
	{ id: "1", title: "เห็นด้วยอย่างยิ่ง", score: 4 },
	{ id: "2", title: "เห็นด้วย", score: 3 },
	{ id: "3", title: "ไม่เห็นด้วย", score: 2 },
	{ id: "4", title: "ไม่เห็นด้วยอย่างยิ่ง", score: 1 },
]

export const questions: Partial<IQuestion>[] = [
	{ id: "1", title: "โดยทั่วไปฉันรู้สึกพอใจในตนเอง" },
	{ id: "2", title: "บ่อยครั้งที่ฉันคิดว่าตนเองไม่มีอะไรดีเลย" },
	{ id: "3", title: "ฉันรู้สึกว่าตัวฉันเองก็มีอะไรดี ๆ เหมือนกัน" },
	{ id: "4", title: "ฉันสามารถทำอะไรได้ดีเหมือน ๆ กับคนอื่น" },
	{ id: "5", title: "ฉันรู้สึกว่าตนเองไม่มีอะไรน่าภาคภูมิใจนัก" },
	{ id: "6", title: "ฉันรู้สึกบ่อย ๆ ว่าตนเองไร้ค่า" },
	{ id: "7", title: "ฉันรู้สึกว่าตนเองมีคุณค่าอย่างน้อยสุดก็เท่า ๆ กับคนอื่น" },
	{ id: "8", title: "ฉันอยากจะภาคภูมิใจในตนเองมากกว่านี้" },
	{ id: "9", title: "โดยรวมแล้วฉันมีความรู้สึกว่าตนเองล้มเหลว" },
	{ id: "10", title: "ฉันมีความรู้สึกที่ดีกับตนเอง" },
].map((e) => ({ ...e, choices: choices }))

export const criterias: ICriteria[] = [
	{
		range: {
			start: 31,
			end: 40,
		},
		criteria: "มีความรู้สึกมีคุณค่าในตนเองสูง",
		criteriaRange: "สูง",
		title: "ระดับคะแนนของคุณอยู่ในช่วง 31 - 40",
	},
	{
		range: {
			start: 21,
			end: 30,
		},
		criteria: "มีความรู้สึกมีคุณค่าในตนเองปานกลาง",
		criteriaRange: "ปานกลาง",
		title: "ระดับคะแนนของคุณอยู่ในช่วง 21 - 30",
	},
	{
		range: {
			start: 10,
			end: 20,
		},
		criteria: "มีความรู้สึกมีคุณค่าในตนเองต่ำ",
		criteriaRange: "ต่ำ",
		title: "ระดับคะแนนของคุณอยู่ในช่วง 10 - 20",
	},
]
