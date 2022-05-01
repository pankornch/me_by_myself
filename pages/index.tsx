import type { NextPage } from "next"
import Image from "../src/components/Image"
import { ArrowRightIcon } from "@heroicons/react/solid"
import Link from "next/link"
import Navbar from "../src/components/Navbar"

const DISC = [
	{
		image: "/dominance.png",
		title: "DOMINANCE",
		behavior: {
			focusOn: "อำนาจ",
			communication: "บอก สั่ง",
			incentives: "งานที่ท้าทาย ผลตอบแทนคุ้มค่า",
			afraid: "ความล้มเหลว",
		},
	},
	{
		image: "/influence.png",
		title: "INFLUENCE",
		behavior: {
			focusOn: "คน",
			communication: "เกลี้ยกล่อม ชักชวน",
			incentives: "การยอมรับความสามารถ ยอมรับจากสังคม",
			afraid: "การถูกปฏิเสธ กลัวคนอื่นไม่รัก",
		},
	},
	{
		image: "/steadiness.png",
		title: "STEADINESS",
		behavior: {
			focusOn: "ขั้นตอน ประสบการณ์",
			communication: "ฟัง",
			incentives: "ความมั่นคง การยอมรับ",
			afraid: "ความไม่มั่นคง",
		},
	},
	{
		image: "/compliance.png",
		title: "COMPLIANCE",
		behavior: {
			focusOn: "นโยบาย",
			communication: "เขียน / เป็นทางการ",
			incentives: "หน้าที่รับผิดชอบ ชัดเจน กฎระเบียบแน่นอน",
			afraid: "ความขัดแย้ง",
		},
	},
]

const Home: NextPage = () => {
	return (
		<div className="bg-gradient-to-b from-main-blue-green/75 h-screen px-4 md:px-24 lg:px-48 pt-12">
			<div className="bg-white p-4 rounded-3xl flex flex-col gap-y-8 shadow-lg lg:w-[40rem] m-auto">
				<Navbar responsive={false} />

				<h3 className="text-[1.8rem] font-semibold">
					Build your self-esteem by yourself.
				</h3>

				<p className="font-light">
					อย่าสูญเสียตัวตนเพราะคำพูดและการกระทำของใครบางคน ที่เขาบอกมา
					แล้วไม่ใช่ <span className="text-main-blue-green">“ตัวเรา”</span>{" "}
					คุณทุกคนมี<span className="text-main-blue-green">คุณค่าในตนเอง</span>
					หันกลับมามองตนเอง ภูมิใจในความเป็นเรา และสร้าง
					<span className="text-main-blue-green">เป้าหมาย</span>
					ในการดำเนินชีวิตต่อไป
				</p>

				<div className="flex justify-center hover:scale-110 ease-in-out duration-200">
					<Link href="/question">
						<a className="flex items-center bg-main-blue-green w-fit px-6 py-2 text-white rounded-full font-medium">
							เริ่มทำแบบประเมินได้เลย
							<ArrowRightIcon className="w-4 h-4 ml-2" />
						</a>
					</Link>
				</div>
			</div>
			<div className="text-center mt-16 mb-8 font-semibold">
				<h3>4 DISC</h3>
				<h5>Personal Testing</h5>
			</div>

			<h6 className="font-semibold mb-2">DISC คืออะไร ?</h6>
			<p className="indent-8">
				DISC เป็นหนึ่งในศาสตร์ทางด้านจิตวิทยา ด้านบุคลิกภาพ (Personality
				Psychology) ที่ใช้วัดพฤติกรรมมนุษย์ 4 ประเภท
			</p>

			<div className="flex flex-col gap-y-6 mt-12 pb-12">
				{DISC.map((disc, index) => (
					<div
						key={disc.title}
						className="flex flex-col md:flex-row gap-y-6 md:items-center md:justify-between"
					>
						<div className="flex justify-center md:order-2">
							<Image
								src={disc.image}
								className="w-56 md:w-64 h-56 md:h-64 relative"
								alt=""
								objectFit="contain"
							/>
						</div>

						<div className="md:order-1">
							<h5 className="font-medium">
								{index + 1}. {disc.title}
							</h5>
							<ul className="list-disc list-inside">
								<li>ให้ความสำคัญกับ: {disc.behavior.focusOn}</li>
								<li>วิธีการสื่อสาร: {disc.behavior.communication}</li>
								<li>สิ่งจูงใจ: {disc.behavior.incentives}</li>
								<li>กลัว: {disc.behavior.afraid}</li>
							</ul>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Home
