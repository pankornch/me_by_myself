import { FC } from "react"

interface Props {
	range: string
}
const AdviceSection: FC<Props> = ({ range }) => {
	if (range === "ต่ำ")
		return (
			<div className="flex flex-col gap-y-6">
				<div className="flex flex-col gap-y-3">
					<div>
						<span className="text-main-orange">step 1. </span>
						<span>แนะนำให้ทำ</span>
					</div>
					<p>
						<a
							href="https://www.dmh.go.th/test/qtest5/"
							className="text-main-blue-green underline mr-2"
							target="_blank"
							rel="noreferrer"
						>
							แบบประเมิน ST5
						</a>
						ซึ่งคำถามต่อไปนี้จะถามถึงประสบการณ์ของท่านในช่วง ระยะ 2-4
						สัปดาห์ที่ผ่านมา ให้ท่านสำรวจตัวท่านเองและประเมินเหตุการณ์
						อาการหรือความคิดเห็นและความรู้สึกของท่านว่าอยู่ในระดับใด
						หากมีคะแนนประเมินมากกว่า 8 คะแนน
					</p>
					<p>
						<a
							href="https://www.dmh.go.th/test/2q/"
							className="text-main-blue-green underline mr-2"
							target="_blank"
							rel="noreferrer"
						>
							ทำแบบคัดกรองซึมเศร้า 2Q
						</a>
						และหากแบบประเมิน2Q มีคะแนนมากกว่า 1 คะแนน
					</p>
					<p>
						<a
							href="https://www.dmh.go.th/covid19/test/9q/"
							className="text-main-blue-green underline mr-2"
							target="_blank"
							rel="noreferrer"
						>
							ทำแบบประเมินโรคซึมเศร้า 9Q
						</a>
						ต่อไป หากพบว่า 9Qมีคะแนนรวมมากว่า 7 คะเเนน
					</p>
					<a
						href="https://www.dmh.go.th/covid19/test/8q/"
						className="text-main-blue-green underline"
						target="_blank"
						rel="noreferrer"
					>
						ประเมินความเสี่ยงฆ่าตัวตาย8Q
					</a>
				</div>
				<p>
					<span className="text-main-orange">step 2. </span>แนะนำให้โทรปรึกษา
					1323 เพื่อให้คำปรึกษาปัญหาสุขภาพจิต เช่น รู้สึกไม่สบายใจ
					มีปัญหาที่ยังหาทางออกไม่ได้ หาที่ปรึกษาสำหรับระบายความรู้สึก
					ชี้เเนะเเนวทาง และให้กำลังใจ เป็นต้น step
				</p>
				<p>
					<span className="text-main-orange">step 3. </span>
					ให้คำแนะนำให้ไปพบแพทย์ เพื่อเข้ารับการรักษาและดูแลอย่างถูกวิธี
					รวมไปถึงทำกิจกรรมส่งเสริมและฟื้นฟู
				</p>
			</div>
		)
	else if (range === "ปานกลาง")
		return (
			<div className="flex flex-col gap-y-6 text-main-blue-green font-medium">
				<p>เกณฑ์กลาง: ลองเปลี่ยนวิธีคิด ดังต่อไปนี้</p>
				<p>
					1.ไม่เปรียบเทียบตนเองกับผู้อื่น เพราะการเปรียบเทียบตนเองกับผู้อื่น
					จะก่อให้เกิดความรู้สึกไม่ดีต่อตนเอง เกิดความกังวล ความเครียด
					หรือรู้สึกว่าตนเองด้อยค่า
					ดังนั้นอาจจะเริ่มจากการปรับทัศนคติและมุมมองว่าตนเองนั้นทำอย่างสุดความสามารถแล้ว
				</p>
				<p>
					2.ให้อภัยตัวเองสำหรับความผิดพลาด
					เพราะความผิดพลาดมักจะเป็นสาเหตุของความโกรธหรือความรู้สึกแย่
					ซึ่งยิ่งจะเป็นการบั่นทอน ทำให้เกิดความคิดแง่ลบ
					ดังนั้นจึงควรให้อภัยตัวเอง จะช่วยให้จิตใจสงบสุข
				</p>
				<p>
					3.ตั้งเป้าหมายเล็ก ๆ ในแต่ละวัน เช่น วันนี้ฉันต้องออกกำลังกาย,
					วันนี้ฉันต้องกินข้าวครบ 3 มื้อ หรือวันนี้ฉันต้องนอนเร็ว
					แม้ว่าจะเป็นเป้าหมายเล็ก ๆ แต่การตั้งเป้าหมายเล็ก ๆ นี้เอง
					จะทำให้เราสามารถทำตามเป้าได้สำเร็จ และเกิดเป็นความภูมิใจในตัวเอง
				</p>
				<p>
					4.กล้าปฏิเสธในสิ่งที่ไม่ต้องการ
					การยอมรับสิ่งที่ไม่ต้องการเปรียบเสมือนการฝืนทำสิ่งใดสิ่งหนึ่ง
					ซึ่งจะส่งผลให้จิตใจของเราหดหู่และเศร้าหมอง
					ดังนั้นจึงควรให้ความสำคัญกับความต้องการตนเองและนึกถึงตนเอง
				</p>
				<p>
					5.พูดขอบคุณและให้คำชมเล็ก ๆ น้อย ๆ กับตัวเอง ข้อนี้สามารถทำได้ง่าย ๆ
					เช่น ขอบคุณนะ วันนี้เรากินน้ำได้เยอะมาก เก่งที่สุด หรือขอบคุณนะ
					วันนี้เรานำเสนองานได้ดีมาก ๆ เลย
					ซึ่งการพูดขอบคุณและให้คำชมกับตัวเองแบบดังกล่าว
					เป็นอีกหนึ่งวิธีเพิ่มความเชื่อมั่นและความศรัทธาในตนเอง
				</p>

				<p>
					6.ปรับทัศนคติ มองโลกในแง่บวกให้มากขึ้น การมีทัศนคติหรือมองโลกในแง่ลบ
					ย่อมส่งผลให้ทั้งกับทั้งตัวเราเองและคนรอบข้างรู้สึกแย่
					ดังนั้นจึงควรเริ่มปรับทัศนคติและเปลี่ยนมุมมองใหม่
					จะช่วยลดความวิตกกังวลได้
				</p>
				<p>
					7.อยู่กับคนที่มอบพลังบวกและความสบายใจ เช่นเดียวกับข้อที่ผ่านมา
					การอยู่กับคนที่มีทัศนคติที่ดี มีพลังบวก
					สามารถพูดคุยหรือขอคำปรึกษาได้ในทุก ๆ เรื่อง
					ย่อมทำให้เราเกิดความสบายใจและมีความสุขในการใช้ชีวิตได้
				</p>
				<p>
					8.รู้จักแยกแยะระหว่างเรื่องจริงและเรื่องลวง
					เลือกโฟกัสเฉพาะสิ่งที่อยู่ตรงหน้าและปรับทัศนคติต่อเรื่องนั้น ๆ
					เสียใหม่ เช่น เรากังวลว่าจะสอบไม่ผ่าน อาจจะทำให้รู้สึกเครียด กดดัน
					และคิดมาก แต่ถ้าหากเราโฟกัสกับการสอบ
					ปรับทัศนคติว่าเรามีความสามารถมากพอที่จะทำข้อสอบผ่าน
					ก็จะช่วยลดความกังวลและสร้างความสงบในจิตใจได้
				</p>
				<p>
					9.หางานอดิเรกที่สนใจ หากเป็นงานอดิเรกที่เราสนใจแล้ว
					แน่นอนว่าเราอาจจะสามารถทำได้ดีกว่าการทำสิ่งอื่น ๆ ซึ่งเมื่อทำได้ดี
					ก็อาจจะประสบความสำเร็จ เกิดเป็นความชอบ
					และความภาคภูมิใจในตัวเองในที่สุด
				</p>
				<p>
					10.เลิกยึดติดกับอดีตหรือความผิดพลาดที่เคยเกิดขึ้น
					การยึดติดกับความผิดพลาดในอดีตจะทำให้เรารู้สึกผิด รู้สึกแย่ตลอดเวลา
					ดังนั้นเราควรเลิกยึดติดกับสิ่งนั้น ๆ แล้วพลิกวิกฤตเป็นโอกาส
					เปลี่ยนสิ่งที่เคยผิดพลาดมาเป็นบทเรียนสำคัญในอนาคต
				</p>
			</div>
		)
	else
		return (
			<div className="flex flex-col gap-y-6 text-main-blue-green font-medium">
				<p>เกณฑ์สูง: ส่งเสริมพฤติกรรมการเห็นคุณค่าในตนเอง</p>
				<p>
					1. ตระหนักรู้คุณลักษณะที่ดีของตนเอง
					มนุษย์ทุกคนมีข้อดีและคุณลักษณะที่ดี ได้แก่ ฉันเป็นคน ซื่อสัตว์ มีน้ำใจ
					รับผิดชอบ มองโลกในแง่ดี ใจเย็น เข้มแข็ง จิตใจดี มีเหตุผล อัธยาศัยดี
					อดทน จริงใจ ขยัน
				</p>
				<p>
					2. เห็นคุณค่าในสิ่งที่มี สิ่งที่มีคุณค่าในชีวิต เช่น สุขภาพดี
					ร่างกายแข็งแรง กินได้ นอนหลับ เป็นต้น
					หากเราหันมาเห็นคุณค่าของสิ่งที่เรามีอยู่ ไม่ว่าจะเป็นสุขภาพร่างกาย
					สุขภาพจิต หรือแม้กระทั้งความรัก ความปรารถนาดี
					มิตรภาพที่ได้รับจากบุคคลที่แวดล้อม
					ชีวิตเราจะมีความสุขมากขึ้นเพราะที่จริงเรามีสิ่งทรงคุณค่ามากมายอยู่แล้ว
				</p>
				<p>
					3. เมตตาตนเอง ทุกคนต่างมีทั้งข้อดีและข้อเสีย
					ความสมบูรณ์แบบไม่ได้มีอยู่จริง ผู้ที่สมบูรณ์แบบทุกเรื่องไม่มี
					แทนที่จะมาเปรียบเทียบ ตำหนิ ดุด่า ลดคุณค่าตนเอง
					จะดีกว่าหรือไม่หากเราหันมาให้กำลังใจและเมตตาตัวเอง “ขอให้เรามีความสุข
					ขอให้เราได้ใช้ศักยภาพที่มีให้เกิดประโยชน์สูงสุด ขอให้เรามีสติ”
					สิ่งประเสริฐสุดอย่างหนึ่งที่เราสามารถทำได้เองก็คือ
					การมอบความเป็นมิตรให้แก่ตนเอง
				</p>
				<div>
					<p>4. ตั้งเป้าหมายในชีวิต ซึ่งเป้าหมายเล็กๆ ในชีวิตที่ควรมี ได้แก่</p>
					<ul className="list-disc list-inside pl-4">
						<li>
							รักษาสุขภาพ ออกกำลังกายสม่ำเสมอ เลือกกินอาหารที่มีประโยชน์
							ลดกาแฟและของหวาน นอนหลับพักผ่อนให้เพียงพอ เลิกสูบบุหรี่
						</li>
						<li>
							ดูแลจิตใจ เติมความสุขให้ตัวเอง ชื่นชมยินดีกับเรื่องเล็กน้อยรอบตัว
							ปล่อยวางเรื่องที่ทำให้ไม่สบายใจ อยู่กับปัจจุบันอย่างมีสติ
							พูดคุยกับคนที่มองโลกในแง่ดี
						</li>
						<li>
							วางแผนการเงิน
							มีเป้าหมายที่ชัดเจนในการใช้จ่ายอย่างเหมาะสมและรู้จักเก็บออม
						</li>
						<li>
							พัฒนาตนเอง ชีวิต คือ การเรียนรู้ ลองทำกิจกรรมใหม่ๆ เช่น เรียนภาษา
							ปลูกต้นไม้ ท่องเที่ยว เรียนร้องเพลง
							ทำกิจกรรมที่น่าสนใจร่วมกับคนอื่น เป็นต้น การเรียนรู้ทักษะใหม่ๆ
							ช่วยส่งเสริมความรู้สึกมีคุณค่าและเสริมสร้างความมั่นใจ
						</li>
					</ul>
				</div>
				<p>
					5. ให้เวลากับครอบครัวและคนที่มีความจริงใจกับเรามากขึ้น
					แทนที่จะทุ่มเทเวลาทั้งหมดเพื่อให้ได้มาซึ่งการยอมรับนับถือจากบุคคลอื่น
					ขอให้รักตัวเองและให้เวลากับคนที่พร้อมจะให้กำลังใจเรา
				</p>
			</div>
		)
}

export default AdviceSection
