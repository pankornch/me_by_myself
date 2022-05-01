import { useMutation } from "@apollo/client"
import { CloudUploadIcon } from "@heroicons/react/solid"
import { NextPage } from "next"
import React, { useEffect, useMemo, useRef, useState } from "react"
import Swal from "sweetalert2"
import Input from "../../../src/components/Input"
import NavbarAccount from "../../../src/components/NavbarAccount"
import NoSSR from "../../../src/components/NoSSR"
import { MUTATION_UPDATE_USER } from "../../../src/gql"
import useUser from "../../../src/hooks/useUser"

const EditProfilePage: NextPage = () => {
	const [user, refetchUser] = useUser()

	const [telNumber, setTelNumber] = useState<string>("")
	const [firstName, setFirstName] = useState<string>("")
	const [lastName, setLastName] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [newPassword, setNewPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")

	const [updateUser, { loading }] = useMutation(MUTATION_UPDATE_USER)

	const submitLoadingRef = useRef<boolean>(false)

	const [validateError, setValidateError] = useState<Record<string, any>>({})

	useEffect(() => {
		if (!user) return
		setTelNumber(user.telNumber)
		setFirstName(user.firstName)
		setLastName(user.lastName)
	}, [user])

	const validatePassword = useMemo(() => {
		if (newPassword !== confirmPassword) return "กรุณากรอกรหัสให้ตรงกัน"
	}, [newPassword, confirmPassword])

	const handleSubmit = async () => {
		if (
			Object.values(validateError).filter(Boolean).length ||
			submitLoadingRef.current ||
			validatePassword
		)
			return null

		submitLoadingRef.current = true

		const updateUserInput: any = {
			telNumber,
			firstName,
			lastName,
		}

		if (newPassword) {
			updateUserInput.newPassword = newPassword
			updateUserInput.password = password
		}

		try {
			await updateUser({
				variables: {
					input: updateUserInput,
				},
			})

			Swal.fire({
				title: "แก้ไขบัญชีสำเร็จ",
				timer: 3000,
				icon: "success",
			})

			refetchUser()
		} catch (error: any) {
			if (error.message === "Incorrect current password") {
				Swal.fire({
					title: "แก้ไขบัญชีสำเร็จไม่สำเร็จ",
					text: "รหัสผ่านเดิมไม่ถูกต้อง",
					timer: 3000,
					icon: "error",
				})
			} else {
				Swal.fire({
					title: "แก้ไขบัญชีสำเร็จไม่สำเร็จ",
					text: "ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง",
					timer: 3000,
					icon: "error",
				})
				console.error(error)
			}
		}

		submitLoadingRef.current = false
	}

	return (
		<div className="px-4 py-12 pt-32 md:px-24 lg:px-48">
			<NavbarAccount />
			<h5 className="font-medium text-center mb-6">แก้ไขบัญชี</h5>
			<div className="flex flex-col gap-y-2">
				<Input
					label="เบอร์โทร"
					value={telNumber}
					onChangeValue={(value) => {
						if (!/^\d+$/.test(value) && value) return
						setTelNumber(value)
					}}
					validate={(value) => {
						if (value.length !== 10) return "กรุณากรอกข้อมูลเบอร์โทรให้ถูกต้อง"
					}}
					onValidateError={(value) =>
						setValidateError((prev) => ({ ...prev, telNumber: value }))
					}
					required
				/>
				<div className="grid grid-cols-2 gap-x-4">
					<Input
						label="ชื่อ"
						value={firstName}
						onChangeValue={setFirstName}
						validate={(value) => !value && "กรุณากรอกชื่อ"}
						onValidateError={(value) =>
							setValidateError((prev) => ({ ...prev, firstName: value }))
						}
						required
					/>
					<Input
						label="นามสกุล"
						value={lastName}
						onChangeValue={setLastName}
						validate={(value) => !value && "กรุณากรอกชื่อนามสกุล"}
						required
						onValidateError={(value) =>
							setValidateError((prev) => ({ ...prev, lastName: value }))
						}
					/>
				</div>
				<Input
					label="รหัสผ่านเดิม"
					value={password}
					onChangeValue={setPassword}
					type="password"
				/>
				<Input
					label="รหัสผ่านใหม่"
					value={newPassword}
					onChangeValue={setNewPassword}
					type="password"
				/>
				<Input
					label="ยืนยันรหัสผ่าน"
					value={confirmPassword}
					onChangeValue={setConfirmPassword}
					type="password"
				/>
			</div>
			{validatePassword && (
				<div className="text-main-red text-xs mt-2">{validatePassword}</div>
			)}
			<button
				onClick={handleSubmit}
				disabled={loading}
				className="flex justify-center items-center py-2 rounded-full bg-main-blue-green w-full text-center text-white font-medium mt-6 hover:scale-105"
			>
				บันทึก
				{loading && <CloudUploadIcon className="w-5 h-5 animate-bounce ml-2" />}
			</button>
		</div>
	)
}

export default NoSSR(EditProfilePage)
