import Link from "next/link"
import React, { FC } from "react"
import useUser from "../hooks/useUser"
import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"
import { EUserRole } from "../../type/enum"

interface Props {
	backButton?: boolean
}
const NavbarAccount: FC<Props> = (props) => {
	const [user, { logout }] = useUser()

	const router = useRouter()

	return (
		<nav className="flex items-center justify-between fixed top-0 left-0 w-screen px-4 py-4 shadow-lg md:px-24 lg:px-48 bg-white z-50">
			<div className="flex items-center">
				{(props.backButton === undefined || props.backButton) && (
					<button onClick={() => router.back()} className="p-4">
						<ChevronLeftIcon className="w-6 h-6" />
					</button>
				)}

				<h4 className="font-semibold text-main-blue-green cursor-pointer">
					<Link href="/">
						<a>Me by Myself</a>
					</Link>
				</h4>
			</div>

			<h6>
				<details className="relative group">
					<summary className="flex before:hidden group-open:before:block before:contents-[' '] before:cursor-default before:h-screen before:w-screen before:fixed before:top-0 before:right-0">
						<div className="flex items-center gap-x-2 cursor-pointer">
							<p className="max-w-[5rem] md:max-w-none truncate">
								{user?.firstName}
							</p>
							<ChevronDownIcon className="w-5 h-5" />
						</div>
					</summary>
					<div className="absolute top-8 right-0 flex flex-col gap-y-1 bg-white shadow-lg rounded-xl w-72 border-2 border-main-grey">
						<Link href="/account">
							<a className="px-4 py-3 text-center cursor-pointer text-main-blue-green hover:bg-main-blue-green hover:text-white first:rounded-t-xl last:rounded-b-xl">
								ประวัติการทำแบบประเมินของฉัน
							</a>
						</Link>
						{user && user?.role !== EUserRole.USER && (
							<Link href="/admin">
								<a className="px-4 py-3 text-center cursor-pointer text-main-blue-green hover:bg-main-blue-green hover:text-white first:rounded-t-xl last:rounded-b-xl">
									ประวัติการทำแบบประเมินทั้งหมด
								</a>
							</Link>
						)}
						<Link href="/question">
							<a className="px-4 py-3 text-center cursor-pointer text-main-blue-green hover:bg-main-blue-green hover:text-white first:rounded-t-xl last:rounded-b-xl">
								ทำแบบประเมิน
							</a>
						</Link>
						<Link href="/account/edit_account">
							<a className="px-4 py-3 text-center cursor-pointer text-main-blue-green hover:bg-main-blue-green hover:text-white first:rounded-t-xl last:rounded-b-xl">
								แก้ไขบัญชี
							</a>
						</Link>
						{user && user?.role === EUserRole.SUPER_ADMIN && (
							<Link href="/admin/account_management">
								<a className="px-4 py-3 text-center cursor-pointer text-main-blue-green hover:bg-main-blue-green hover:text-white first:rounded-t-xl last:rounded-b-xl">
									จัดการบัญชีแอดมิน
								</a>
							</Link>
						)}

						<button
							onClick={logout}
							className="px-4 py-3 text-center cursor-pointer text-main-blue-green hover:bg-main-red hover:text-white first:rounded-t-xl last:rounded-b-xl"
						>
							ออกจากระบบ
						</button>
					</div>
				</details>
			</h6>
		</nav>
	)
}

export default NavbarAccount
