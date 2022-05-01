import React, { FC, useEffect } from "react"
import { createPortal } from "react-dom"
import NoSSR from "./NoSSR"

interface Props {
	show: boolean
	onClose?: (value: boolean) => void
	children: JSX.Element | JSX.Element[]
}
const Modal: FC<Props> = (props) => {

    if (!props.show) return <></>
	const content = (
		<div className="fixed top-0 left-0 w-screen h-screen">
			<>{props.children}</>
			{/* Backdrop */}
			<div
				onClick={props.onClose?.bind(this, false)}
				className="fixed top-0 left-0 w-screen h-screen bg-black/25"
			/>
		</div>
	)

	return createPortal(content, document.getElementById("portal")!)
}

export default NoSSR(Modal) as FC<Props>
