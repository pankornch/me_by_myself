import Link from "next/link"
import React, { FC } from "react"
import useUser from "../hooks/useUser"
import { ChevronLeftIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"

interface Props {
	backButton?: boolean
}
const NavbarAccount: FC<Props> = (props) => {
	const [user, _, logout] = useUser()

	const router = useRouter()

	return (
		<nav className="flex items-center justify-between fixed top-12 left-0 w-screen px-4 md:px-24 lg:px-48 bg-white">
			{(props.backButton === undefined || props.backButton) && (
				<button onClick={() => router.back()} className="p-4">
					<ChevronLeftIcon className="w-6 h-6" />
				</button>
			)}
			<h6>
				<Link href="/account/edit_profile">
					<a className="flex items-center gap-x-2 cursor-pointer">
						สวัสดี
						<div className="max-w-[5rem] md:max-w-none text-ellipsis overflow-hidden">
							{user?.firstName}
						</div>
					</a>
				</Link>
			</h6>
			<button
				onClick={logout}
				className="bg-main-red text-white px-4 py-1 rounded-md"
			>
				ออกจากระบบ
			</button>
		</nav>
	)
}

export default NavbarAccount
