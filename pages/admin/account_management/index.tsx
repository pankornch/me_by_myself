import { useLazyQuery, useMutation } from "@apollo/client"
import { NextPage } from "next"
import React, { FC, useEffect, useMemo, useState } from "react"
import Register from "../../../src/components/Auth/Regiser"
import Tab from "../../../src/components/Tab"
import {
	MUTATION_ADMIN_CREATE_ADMIN_ACCOUNT,
	MUTATIO_ADMIN_DELETE_ADMIN_ACCOUNT,
	QUERY_ADMIN_LIST_ADMIN_ACCOUNTS,
} from "../../../src/gql"
import { ChevronUpIcon } from "@heroicons/react/outline"
import combindClass from "../../../src/utils/combindClass"
import { IUser } from "../../../type"
import NavbarAccount from "../../../src/components/NavbarAccount"
import Swal from "sweetalert2"
import Fuse from "fuse.js"
import Input from "../../../src/components/Input"
import { tailwindColors } from "../../../src/utils/helpers"
import NoSSR from "../../../src/components/NoSSR"
import WithAuth from "../../../src/components/Auth/WithAuth"
import { EUserRole } from "../../../type/enum"
import Layout from "../../../src/components/Layouts"

const AdminAccountManagementPage: NextPage = () => {
	const [createAdminAccount, { loading }] = useMutation(
		MUTATION_ADMIN_CREATE_ADMIN_ACCOUNT
	)

	const handleCreateAccount = async (user: Partial<IUser>) => {
		return createAdminAccount({
			variables: {
				input: user,
			},
		})
	}
	return (
		<Layout navbarType="ACCOUNT">
			<div className="pt-28">
				<h5 className="font-medium text-center mb-6">จัดการบัญชีแอดมิน</h5>
				<Tab
					tabs={[
						{
							label: "เพิ่มบัญชี",
							children: (
								<div className="w-full md:w-1/2 md:m-auto">
									<Register
										buttonText="เพิ่มบัญชี"
										loading={loading}
										onSubmit={handleCreateAccount}
										onSuccess={() => {
											console.log("success")
										}}
									/>
								</div>
							),
						},
						{ label: "ลบบัญชี", children: <DeleteAccount /> },
					]}
				/>
			</div>
		</Layout>
	)
}

const DeleteAccount: FC = () => {
	const [getAdminAccounts, { data, loading }] = useLazyQuery(
		QUERY_ADMIN_LIST_ADMIN_ACCOUNTS
	)

	const [sortType, setSortType] = useState<string>("DESC")

	const toggleSortType = () =>
		setSortType((prev) => (prev === "ASC" ? "DESC" : "ASC"))

	const refetch = () => {
		getAdminAccounts({
			variables: {
				sortInput: {
					orderBy: "createdAt",
					type: sortType,
				},
			},
			fetchPolicy: "network-only",
		})
	}

	useEffect(() => {
		refetch()
	}, [sortType])

	const adminAccounts = useMemo<IUser[]>(() => {
		if (!data) return []
		return data.adminListAdminAccounts
	}, [data])

	const [searchText, setSearchText] = useState<string>("")

	const searchAccount = useMemo(() => {
		const options = {
			threshold: 0.4,
			keys: ["fullName", "telNumber"],
		}
		const fuse = new Fuse(adminAccounts, options)

		const result = fuse.search(searchText)

		if (!searchText) return adminAccounts
		return result.map((e) => e.item)
	}, [searchText, adminAccounts])

	return (
		<div>
			<div className="flex items-center justify-between">
				<p>มีบัญชีทั้งหมด ({loading ? "..." : adminAccounts.length})</p>
				<div className="flex items-center gap-x-2">
					<p>เรียงตาม</p>
					<p>วันที่สร้าง</p>
					<button onClick={toggleSortType} className="p-3 select-none">
						<ChevronUpIcon
							className={combindClass(
								"w-6 h-6",
								sortType === "DESC" ? "rotate-180" : "rotate-0"
							)}
						/>
					</button>
				</div>
			</div>

			<div className="flex items-center gap-x-3 mt-3 border-b-2 pb-4">
				<p>ค้นหาบัญชี</p>
				<Input
					className="grow"
					value={searchText}
					onChangeValue={setSearchText}
					placeholder="ค้นหาบัญชีด้วยชื่อ หรือเบอร์โทร"
				/>
			</div>

			{loading && (
				<h4 className="font-medium text-center text-main-blue-green animate-bounce mt-3">
					กำลังโหลดข้อมูล ...
				</h4>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
				{searchAccount.map((account) => (
					<AdminDeleteAccountCard
						key={account.id}
						user={account}
						onSuccess={refetch}
					/>
				))}
			</div>
		</div>
	)
}
interface Props {
	user: IUser
	onSuccess?: () => void
}
const AdminDeleteAccountCard: FC<Props> = (props) => {
	const [deleteAdminAccount] = useMutation(MUTATIO_ADMIN_DELETE_ADMIN_ACCOUNT)

	const handleDelete = async () => {
		const res = await Swal.fire({
			title: "ต้องการลบบัญชีหรือไม่ ?",
			text: `ต้องการลบบัญชี ${props.user.telNumber} หรือไม่ ?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "ตกลง",
			cancelButtonText: "ยกเลิก",
			confirmButtonColor: tailwindColors.main["blue-green"],
		})

		if (!res.isConfirmed) return
		try {
			await deleteAdminAccount({
				variables: {
					userId: props.user.id,
				},
			})

			Swal.fire({
				title: "ลบบัญชีสำเร็จ",
				icon: "success",
				timer: 3000,
			})
			props.onSuccess?.call(this)
		} catch (error) {
			Swal.fire({
				title: "ลบบัญชีไม่สำเร็จ",
				text: "ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง",
				icon: "error",
				timer: 3000,
			})
		}
	}

	return (
		<div className="flex justify-between items-center px-6 py-3 border-2 border-main-grey shadow-lg rounded-xl">
			<div className="flex gap-x-6">
				<p>{props.user.fullName}</p>
				<p>{props.user.telNumber}</p>
			</div>
			<button
				onClick={handleDelete}
				className="bg-main-red text-white px-4 py-1 rounded-full"
			>
				ลบ
			</button>
		</div>
	)
}

export default NoSSR(
	WithAuth(AdminAccountManagementPage, [EUserRole.SUPER_ADMIN])
)
