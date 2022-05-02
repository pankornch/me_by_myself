import { useRouter } from "next/router"
import React, { FC } from "react"
import useUser from "../../hooks/useUser"

interface ComponentProps {
	component: React.FunctionComponent<object>
	props: React.PropsWithChildren<any>
	context: any
	roles: string[]
}

const Hidden: FC<{ children: JSX.Element }> = () => {
	return <></>
}

const Component: FC<ComponentProps> = ({
	component,
	props,
	context,
	roles,
}) => {
	const [user, { loading }] = useUser()
	const router = useRouter()

	if (loading) {
		return (
			<Hidden>
				<>{component({}, context)}</>
			</Hidden>
		)
	}

	if (!user || !roles.includes(user.role)) {
		router.replace("/")
		return (
			<Hidden>
				<>{component({}, context)}</>
			</Hidden>
		)
	}

	return component(props, context)
}

const WithAuth = (component: React.FunctionComponent<any>, roles: string[]) => {
	return (props: React.PropsWithChildren<any>, context: any) => {
		return Component({ component, props, context, roles })
	}
}

export default WithAuth
