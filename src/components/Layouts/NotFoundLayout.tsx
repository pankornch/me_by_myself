import React, { FC } from "react"

interface Props {
	isNotFound: boolean
	notFoundComponent: JSX.Element | JSX.Element[]
	children: JSX.Element | JSX.Element[]
}

const NotFoundLayout: FC<Props> = (props) => {
	return <>{props.isNotFound ? props.notFoundComponent : props.children}</>
}

export default NotFoundLayout
