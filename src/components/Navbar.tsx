import { MenuIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { createContext, FC, useContext, useRef, useState } from "react"
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
import RegisterComponent from "./Auth/Regiser"
import { IUser } from "../../type"
import { tailwindColors } from "../utils/helpers"

const Context = createContext<{
	onCloseModal?: (value: boolean) => void
	refetchUser?: () => Promise<void>
}>({})

interface Props {
	responsive?: boolean
}
const Navbar: FC<Props> = ({ responsive = true }) => {
	const [isMenuShow, setIsMenuShow] = useState<boolean>(false)
	const handleToggleMenu = () => setIsMenuShow((prev) => !prev)

	const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

	const [user, { refetch: refetchUser }] = useUser()

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
					<Link href={user.role === "USER" ? "/account" : "/admin"}>
						<a className="hover:text-main-blue-green hover:underline underline-offset-4">
							บัญชีของฉัน
						</a>
					</Link>
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

					<div className="absolute top-10 left-0 md:left-1/2 bg-white w-[100%] md:w-64 shadow-2xl rounded-3xl p-4 border-main-grey border-2 z-50">
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
									<Link href={user.role === "USER" ? "/account" : "/admin"}>
										<a className="hover:text-main-blue-green hover:underline underline-offset-4">
											บัญชีของฉัน
										</a>
									</Link>
								) : (
									<button
										onClick={() => {
											setShowLoginModal(true)
											setIsMenuShow(false)
										}}
										className="hover:text-main-blue-green hover:underline underline-offset-4"
									>
										เข้าสู่ระบบ
									</button>
								)}
							</li>
						</ul>
					</div>
				</>
			)}
			<Context.Provider
				value={{ onCloseModal: setShowLoginModal, refetchUser }}
			>
				<Modal show={showLoginModal} onClose={setShowLoginModal}>
					<div className="bg-white absolute top-36 left-1/2 z-50 p-8 -translate-x-1/2 flex flex-col gap-y-6 w-[90vw] md:w-[30rem] shadow-lg rounded-3xl">
						<XCircleIcon
							className="w-6 h-6 absolute top-4 right-4 cursor-pointer text-main-red"
							onClick={() => setShowLoginModal(false)}
						/>
						<Tab
							tabs={[
								{
									label: "สมัครสมาชิก",
									children: <Register />,
								},
								{
									label: "เข้าสู่ระบบ",
									children: <Login />,
								},
							]}
						/>
					</div>
				</Modal>
			</Context.Provider>
		</nav>
	)
}

export const Register = () => {
	const [createUser, { loading }] = useMutation(MUTATIOB_CREATE_USER)

	const context = useContext(Context)

	const handleSubmit = async (user: Partial<IUser>) => {
		return createUser({
			variables: {
				input: user,
			},
		})
	}

	const onSuccess = (res: any) => {
		context.onCloseModal!(false)
		localStorage.setItem("access_token", res.data.createUser.token)
		context.refetchUser!()
	}

	return (
		<RegisterComponent
			onSubmit={handleSubmit}
			loading={loading}
			onSuccess={onSuccess}
		/>
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
				confirmButtonColor: tailwindColors.main["blue-green"],
			})

			context.onCloseModal!(false)
			context.refetchUser!()
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

export default NoSSR(Navbar) as FC<Props>
