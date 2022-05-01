import React, { FC, useMemo, useState } from "react"
import combindClass from "../utils/combindClass"

interface Props {
	tabs: ITab[]
	selectedTabIndex?: number
}

interface ITab {
	label: string
	chidren: JSX.Element | JSX.Element[]
}

const Tab: FC<Props> = (props) => {
	const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)

	const tabLabels = useMemo(() => {
		return (
			<div className="flex justify-center text-lg font-medium cursor-pointer divide-x-2 divide-black">
				{props.tabs.map((tab, index) => (
					<div
						onClick={() => setCurrentTabIndex(index)}
						key={index}
						className={combindClass(
							"px-4",
							index === currentTabIndex &&
								"underline underline-offset-4 text-main-blue-green"
						)}
					>
						{tab.label}
					</div>
				))}
			</div>
		)
	}, [props.tabs, currentTabIndex])

	return (
		<>
			{tabLabels}
			<div>{props.tabs[currentTabIndex]?.chidren}</div>
		</>
	)
}

export default Tab
