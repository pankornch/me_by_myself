import React, { FC } from "react"

export interface IOption {
	value: string
	text: string
}

interface Props {
	options: IOption[]
	value?: string
	onChangeValue?: (value: string) => void
	label?: JSX.Element | string
	className?: string
}
const Select: FC<Props> = (props) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		props.onChangeValue?.call(this, e.target.value)
	}
	return (
		<div className={props.className}>
			{props.label && <span className="mb-1">{props.label}</span>}

			<select
				className="w-full px-3 py-1 border-2 border-main-grey outline-none rounded-lg focus:ring focus:ring-main-blue-green m-1"
				onChange={handleChange}
				value={props.value}
			>
				{props.options.map((option) => (
					<option key={option.text} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	)
}

export default Select
