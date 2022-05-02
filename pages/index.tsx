import type { NextPage } from "next"
import Image from "../src/components/Image"
import { ArrowRightIcon } from "@heroicons/react/solid"
import Link from "next/link"
import Navbar from "../src/components/Navbar"
import { useInView } from "react-intersection-observer"
import { DISC } from "../src/api/data/disc"
import { FC, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

const Home: NextPage = () => {
	return (
		<div className="bg-gradient-to-b from-main-blue-green/75 h-screen px-4 md:px-24 lg:px-48 pt-12">
			<div className="min-h-[70vh]">
				<div className="bg-white p-4 rounded-3xl flex flex-col gap-y-8 shadow-lg lg:w-[40rem] m-auto">
					<Navbar responsive={false} />
					<h3 className="text-[1.8rem] font-semibold">
						Build your self-esteem by yourself.
					</h3>
					<p className="font-light text-xl">
						อย่าสูญเสียตัวตนเพราะคำพูดและการกระทำของใครบางคน ที่เขาบอกมา
						แล้วไม่ใช่ <span className="text-main-blue-green">“ตัวเรา”</span>{" "}
						คุณทุกคนมี
						<span className="text-main-blue-green">คุณค่าในตนเอง</span>
						หันกลับมามองตนเอง ภูมิใจในความเป็นเรา และสร้าง
						<span className="text-main-blue-green">เป้าหมาย</span>
						ในการดำเนินชีวิตต่อไป
					</p>
					<div className="flex justify-center hover:scale-110 ease-in-out duration-200 text-xl">
						<Link href="/question">
							<a className="flex items-center bg-main-blue-green w-fit px-6 py-2 text-white rounded-full font-medium">
								เริ่มทำแบบประเมินได้เลย
								<ArrowRightIcon className="w-4 h-4 ml-2" />
							</a>
						</Link>
					</div>
				</div>
			</div>
			<div className="text-center my-8 font-semibold">
				<h2>4 DISC</h2>
				<h4>Personal Testing</h4>
			</div>

			<h4 className="font-semibold mb-2">DISC คืออะไร ?</h4>
			<p className="indent-8 text-xl">
				DISC เป็นหนึ่งในศาสตร์ทางด้านจิตวิทยา ด้านบุคลิกภาพ (Personality
				Psychology) ที่ใช้วัดพฤติกรรมมนุษย์ 4 ประเภท
			</p>

			<div className="flex flex-col gap-y-6 mt-12 pb-12">
				{DISC.map((disc, index) => (
					<Disc key={disc.title} disc={disc} index={index} />
				))}
			</div>
		</div>
	)
}

interface Props {
	disc: {
		image: string
		title: string
		behavior: {
			focusOn: string
			communication: string
			incentives: string
			afraid: string
		}
		color: string
	}
	index: number
}
const Disc: FC<Props> = ({ disc, index }) => {
	const { ref, inView } = useInView({ threshold: 1 })

	const animate = useAnimation()

	useEffect(() => {
		if (inView) {
			animate.start({
				left: "50%",
				transition: {
					type: "spring",
					duration: 0.5,
					bounce: 0.8,
				},
			})
		} else {
			animate.start({
				left: "100%",
			})
		}
	}, [inView])

	return (
		<div
			ref={ref}
			className="flex flex-col md:flex-row gap-y-6 md:items-center md:justify-between  overflow-hidden"
		>
			<div className="flex justify-center md:order-2">
				<div className="relative w-[18rem] h-[18rem]">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
						<Image
							src={disc.image}
							className="w-56 md:w-64 h-56 md:h-64 relative"
							alt=""
							objectFit="contain"
						/>
					</div>
					<motion.div
						className="w-[18rem] h-[18rem] rounded-full absolute top-0 -translate-x-1/2"
						style={{ backgroundColor: disc.color }}
						animate={animate}
					/>
				</div>
			</div>

			<div className="md:order-1">
				<h4 className="font-medium">
					{index + 1}. {disc.title}
				</h4>
				<ul className="list-disc list-inside text-xl">
					<li>ให้ความสำคัญกับ: {disc.behavior.focusOn}</li>
					<li>วิธีการสื่อสาร: {disc.behavior.communication}</li>
					<li>สิ่งจูงใจ: {disc.behavior.incentives}</li>
					<li>กลัว: {disc.behavior.afraid}</li>
				</ul>
			</div>
		</div>
	)
}

export default Home
