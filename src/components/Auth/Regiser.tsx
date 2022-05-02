import { CloudUploadIcon } from "@heroicons/react/outline"
import { FC, useMemo, useRef, useState } from "react"
import Swal from "sweetalert2"
import { IUser } from "../../../type"
import { tailwindColors } from "../../utils/helpers"
import Input from "../Input"

interface Props {
	buttonText?: string
	loading?: boolean
	onSubmit: (user: Partial<IUser>) => Promise<any>
	onSuccess?: (res: any) => void
}

const Register: FC<Props> = (props) => {
	const [telNumber, setTelNumber] = useState<string>("")
	const [firstName, setFirstName] = useState<string>("")
	const [lastName, setLastName] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")

	const submitLoadingRef = useRef<boolean>(false)

	const [validateError, setValidateError] = useState<Record<string, any>>({})

	const validatePassword = useMemo(() => {
		if (password !== confirmPassword) return "กรุณากรอกรหัสให้ตรงกัน"
	}, [password, confirmPassword])

	const handleSubmit = async () => {
		if (
			Object.values(validateError).filter(Boolean).length ||
			submitLoadingRef.current ||
			validatePassword
		)
			return ""
		submitLoadingRef.current = true

		try {
			const res = await props.onSubmit({
				firstName,
				lastName,
				telNumber,
				password,
			})
			Swal.fire({
				title: "สมัครสมาชิกสำเร็จ",
				icon: "success",
				timer: 3000,
				confirmButtonColor: tailwindColors.main["blue-green"],
			})

			props.onSuccess?.call(this, res)

			setTelNumber("")
			setFirstName("")
			setLastName("")
			setPassword("")
			setConfirmPassword("")
		} catch (error) {
			if (`this phone number: ${telNumber} has already exists`) {
				Swal.fire({
					title: "สมัครสมาชิกไม่สำเร็จ",
					text: "เบอร์โทรนี้เคยใช้สมัครสมาชิกแล้ว",
					icon: "error",
					timer: 3000,
				})
			} else {
				console.error(error)
			}
		}

		submitLoadingRef.current = false
	}

	return (
		<>
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
					label="รหัสผ่าน"
					value={password}
					onChangeValue={setPassword}
					type="password"
					required
					onValidateError={(value) =>
						setValidateError((prev) => ({ ...prev, password: value }))
					}
				/>
				<Input
					label="ยืนยันรหัสผ่าน"
					value={confirmPassword}
					onChangeValue={setConfirmPassword}
					type="password"
					required
					onValidateError={(value) =>
						setValidateError((prev) => ({ ...prev, confirmPassword: value }))
					}
				/>
			</div>
			{validatePassword && (
				<div className="text-main-red text-xs mt-2">{validatePassword}</div>
			)}
			<button
				onClick={handleSubmit}
				disabled={props.loading}
				className="flex justify-center items-center py-2 rounded-full bg-main-blue-green w-full text-center text-white font-medium mt-6 hover:scale-105"
			>
				{props.buttonText || "สมัครสมาชิก"}
				{props.loading && (
					<CloudUploadIcon className="w-5 h-5 animate-bounce ml-2" />
				)}
			</button>
		</>
	)
}

export default Register
