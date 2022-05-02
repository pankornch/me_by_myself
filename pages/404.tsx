import Link from "next/link"
import React from "react"
import Image from "../src/components/Image"
import Layout from "../src/components/Layouts"

const NotFoundPage = () => {
	return (
		<Layout navbarType="HOME">
			<Image
				className="h-72 w-full md:h-96 relative"
				src="/not found.png"
				alt=""
				objectFit="contain"
			/>

			<div className="flex flex-col items-center gap-y-6 mt-24">
				<h2 className="text-bold text-main-blue-green">ไม่พบหน้านี้ !</h2>

				<h4 className="underline underline-offset-4 hover:text-main-blue-green cursor-pointer">
					<Link href="/">
						<a>กลับไปหน้าหลัก</a>
					</Link>
				</h4>
			</div>
		</Layout>
	)
}

export default NotFoundPage
