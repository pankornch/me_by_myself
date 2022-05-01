import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { IUser } from "../../type"
import { useMutation } from "@apollo/client"
import { MUTATION_REFRESH_TOKEN } from "../gql/index"

const useUser = (): [IUser | null, () => Promise<void>] => {
	const [user, setUser] = useState<IUser | null>(null)
	const [refreshToken] = useMutation(MUTATION_REFRESH_TOKEN)

	const getUserData = () => {
		const token = localStorage.getItem("access_token")
		if (!token) return

		try {
			const decodedToken = jwtDecode<{ sub: string; payload: IUser }>(token)
			setUser(decodedToken.payload)
		} catch (error) {}
	}

	const refetch = async (): Promise<void> => {
		try {
			const res = await refreshToken()
            const token = res.data.refreshToken.token
			localStorage.setItem("access_token", token)
			try {
                const decodedToken = jwtDecode<{ sub: string; payload: IUser }>(token)
                setUser(decodedToken.payload)
            } catch (error) {}
		} catch (error) {}
	}

	useEffect(() => {
		getUserData()
	}, [])

	return [user, refetch]
}

export default useUser
