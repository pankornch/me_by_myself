import { MenuIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { createContext, FC, useContext, useMemo, useRef, useState } from "react"
import Input from "../components/Input"
import combindClass from "../utils/combindClass"
import Modal from "./Modal"
import NoSSR from "./NoSSR"
import Tab from "./Tab"
import { XCircleIcon, CloudUploadIcon } from "@heroicons/react/outline"
import { useMutation } from "@apollo/client"
import { MUTATIOB_CREATE_USER, MUTATION_LOGIN } from "../gql"
import Swal from "sweetalert2"
import useUser from "../hooks/useUser"

const Context = createContext<{ onCloseModal?: (value: boolean) => void }>({})

interface Props {
	responsive?: boolean
}
const Navbar: FC<Props> = ({ responsive = true }) => {
	const [isMenuShow, setIsMenuShow] = useState<boolean>(false)
	const handleToggleMenu = () => setIsMenuShow((prev) => !prev)

	const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

	const [user] = useUser()

	return (
		<nav className="flex items-center justify-between relative">
			<h4 className="font-semibold text-main-blue-green cursor-pointer">
				<Link href="/">
					<a>Me by Myself</a>
				</Link>
			</h4>
			<MenuIcon
				className={combindClass(
					responsive ? "block md:hidden" : "block",
					"w-8 h-8 cursor-pointer"
				)}
				onClick={handleToggleMenu}
			/>

			<ul
				className={combindClass(
					responsive ? "hidden md:flex" : "hidden",
					"items-center text-lg gap-y-3 gap-x-12"
				)}
			>
				<li>
					<Link href="/">
						<a className="hover:text-main-blue-green hover:underline underline-offset-4">
							หน้าหลัก
						</a>
					</Link>
				</li>
				<li>
					<Link href="/question">
						<a className="hover:text-main-blue-green hover:underline underline-offset-4">
							ทำแบบประเมิน
						</a>
					</Link>
				</li>
				{user ? (
					<button className="hover:text-main-blue-green hover:underline underline-offset-4">
						บัญชีของฉัน
					</button>
				) : (
					<li>
						<button
							onClick={() => setShowLoginModal(true)}
							className="hover:text-main-blue-green hover:underline underline-offset-4"
						>
							เข้าสู่ระบบ
						</button>
					</li>
				)}
			</ul>

			{isMenuShow && (
				<>
					<div
						onClick={() => setIsMenuShow(false)}
						className="w-screen h-screen bg-black opacity-25 fixed top-0 left-0 z-40"
					/>

					<div className="absolute top-10 left-0 bg-white w-[100%] shadow-2xl rounded-3xl p-4 border-main-grey border-2 z-50">
						<ul className="flex flex-col items-center text-lg gap-y-3">
							<li>
								<Link href="/">
									<a className="hover:text-main-blue-green hover:underline underline-offset-4">
										หน้าหลัก
									</a>
								</Link>
							</li>
							<li>
								<Link href="/question">
									<a className="hover:text-main-blue-green hover:underline underline-offset-4">
										ทำแบบประเมิน
									</a>
								</Link>
							</li>

							<li>
								{user ? (
									<button className="hover:text-main-blue-green hover:underline underline-offset-4">
										บัญชีของฉัน
									</button>
								) : (
									<button className="hover:text-main-blue-green hover:underline underline-offset-4">
										เข้าสู่ระบบ
									</button>
								)}
							</li>
						</ul>
					</div>
				</>
			)}
			<Context.Provider value={{ onCloseModal: setShowLoginModal }}>
				<Modal show={showLoginModal} onClose={setShowLoginModal}>
					<div className="bg-white absolute top-36 left-1/2 z-50 p-8 -translate-x-1/2 flex flex-col gap-y-6 w-[30rem] shadow-lg rounded-3xl">
						<XCircleIcon
							className="w-6 h-6 absolute top-4 right-4 cursor-pointer text-main-red"
							onClick={() => setShowLoginModal(false)}
						/>
						<Tab
							tabs={[
								{
									label: "สมัครสมาชิก",
									chidren: <Register />,
								},
								{
									label: "เข้าสู่ระบบ",
									chidren: <Login />,
								},
							]}
						/>
					</div>
				</Modal>
			</Context.Provider>
		</nav>
	)
}

const Register = () => {
	const [telNumber, setTelNumber] = useState<string>("")
	const [firstName, setFirstName] = useState<string>("")
	const [lastName, setLastName] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")

	const submitLoadingRef = useRef<boolean>(false)
	const [createUser, { loading }] = useMutation(MUTATIOB_CREATE_USER)

	const [validateError, setValidateError] = useState<Record<string, any>>({})

	const context = useContext(Context)

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
			const res = await createUser({
				variables: {
					input: {
						telNumber,
						firstName,
						lastName,
						password,
					},
				},
			})

			localStorage.setItem("access_token", res.data.createUser.token)
			Swal.fire({
				title: "สมัครสมาชิกสำเร็จ",
				icon: "success",
				timer: 3000,
			})
			context.onCloseModal!(false)
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
				disabled={loading}
				className="flex justify-center items-center py-2 rounded-full bg-main-blue-green w-full text-center text-white font-medium mt-6 hover:scale-105"
			>
				สมัครสมาชิก{" "}
				{loading && <CloudUploadIcon className="w-5 h-5 animate-bounce ml-2" />}
			</button>
		</>
	)
}

const Login = () => {
	const [telNumber, setTelNumber] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [validateError, setValidateError] = useState<Record<string, any>>({})

	const submitLoadingRef = useRef<boolean>(false)
	const [login, { loading }] = useMutation(MUTATION_LOGIN)

	const context = useContext(Context)

	const handleSubmit = async () => {
		if (
			Object.values(validateError).filter(Boolean).length ||
			submitLoadingRef.current
		)
			return ""

		submitLoadingRef.current = true

		try {
			const res = await login({
				variables: {
					input: {
						telNumber,
						password,
					},
				},
			})

			localStorage.setItem("access_token", res.data.login.token)

			Swal.fire({
				title: "เข้าสู่ระบบสำเร็จ",
				icon: "success",
				timer: 3000,
			})

			context.onCloseModal!(false)
		} catch (error: any) {
			if (error.message === "Incorrect phone number or password") {
				Swal.fire({
					title: "เข้าสู่ระบบไม่สำเร็จ",
					text: "เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง",
					icon: "error",
					timer: 3000,
				})
			} else {
				Swal.fire({
					title: `เข้าสู่ระบบไม่สำเร็จ (error:})`,
					text: "ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง",
					icon: "error",
					timer: 3000,
				})
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
				<Input
					label="รหัสผ่าน"
					value={password}
					onChangeValue={setPassword}
					validate={(value) => !value && "กรุณากรอกรหัสผ่าน"}
					type="password"
					onValidateError={(value) =>
						setValidateError((prev) => ({ ...prev, password: value }))
					}
					required
				/>
			</div>
			<button
				disabled={loading}
				onClick={handleSubmit}
				className="flex justify-center items-center py-2 rounded-full bg-main-blue-green w-full text-center text-white font-medium mt-6 hover:scale-105 "
			>
				เข้าสู่ระบบ
				{loading && <CloudUploadIcon className="w-5 h-5 animate-bounce ml-2" />}
			</button>
		</>
	)
}

export default NoSSR(Navbar)
