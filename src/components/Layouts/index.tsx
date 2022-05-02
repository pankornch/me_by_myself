import React, { FC } from "react"
import Navbar from "../Navbar"
import NavbarAccount from "../NavbarAccount"

interface Props {
	children: JSX.Element | JSX.Element[]
	navbarType?: "HOME" | "ACCOUNT"
}

const NavbarTypes = {
	HOME: (
		<div className="px-4 py-6 md:px-24 lg:px-48">
			<Navbar />
		</div>
	),
	ACCOUNT: <NavbarAccount />,
}

const DefaultLayout: FC<Props> = (props) => {
	return (
		<>
			{props.navbarType && NavbarTypes[props.navbarType]}
			<div className="px-4 md:px-24 lg:px-48">{props.children}</div>
		</>
	)
}

export default DefaultLayout
