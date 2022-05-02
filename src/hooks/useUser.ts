import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { IUser } from "../../type"
import { useMutation } from "@apollo/client"
import { MUTATION_REFRESH_TOKEN } from "../gql/index"
import { useRouter } from "next/router"

type UserUserReturn = [
	IUser | null,
	{
		refetch: () => Promise<void>
		logout: () => void
		loading: boolean
	}
]

const useUser = (): UserUserReturn => {
	const [user, setUser] = useState<IUser | null>(null)
	const [refreshToken] = useMutation(MUTATION_REFRESH_TOKEN)
	const [loading, setLoading] = useState<boolean>(true)

	const router = useRouter()

	const getUserData = () => {
		setLoading(true)
		const token = localStorage.getItem("access_token")

		if (!token) return setLoading(false)

		try {
			const decodedToken = jwtDecode<{ sub: string; payload: IUser }>(token)
			setUser(decodedToken.payload)
		} catch (error) {}
		setLoading(false)
	}

	const refetch = async (): Promise<void> => {
		try {
			setLoading(true)
			const res = await refreshToken()
			const token = res.data.refreshToken.token
			localStorage.setItem("access_token", token)
			try {
				const decodedToken = jwtDecode<{ sub: string; payload: IUser }>(token)
				setUser(decodedToken.payload)
			} catch (error) {}
		} catch (error) {}
		setLoading(false)
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem("access_token")
		router.replace("/")
	}

	useEffect(() => {
		getUserData()
	}, [])

	return [user, { refetch, logout, loading }]
}

export default useUser
