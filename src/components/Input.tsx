import React, { FC, useState } from "react"
import combindClass from "../utils/combindClass"

interface Props {
	className?: string
	value?: string
	defaultValue?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	onChangeValue?: (value: string) => void
	label?: JSX.Element | string
	placeholder?: string
	required?: boolean
	type?: React.HTMLInputTypeAttribute
	validate?: (value: string) => any
	onValidateError?: (error: string | undefined) => void
}
const Input: FC<Props> = (props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (typeof props.validate === "function") {
			const hasError = props.validate(e.target.value)
			if (typeof hasError === "string") {
				props.onValidateError?.call(this, hasError)
				setValidateError(hasError)
			} else {
				setValidateError("")
                props.onValidateError?.call(this, undefined)
			}
		}
		props.onChange?.call(this, e)
		props.onChangeValue?.call(this, e.target.value)
	}

	const [validateError, setValidateError] = useState<string>("")

	return (
		<div className={props.className}>
			{props.label && (
				<>
					<span
						className={combindClass(
							"mb-1",
							props.required &&
								"after:content-['*'] after:ml-0.5 after:text-main-red",
							validateError && "text-main-red"
						)}
					>
						{props.label}
					</span>
                    <span className="text-xs text-main-red">{validateError}</span>
				</>
			)}
			<input
				className="w-full px-3 py-1 border-2 border-main-grey outline-none rounded-lg focus:ring focus:ring-main-blue-green"
				value={props.value}
				defaultValue={props.defaultValue}
				onChange={handleChange}
				placeholder={props.placeholder}
				type={props.type}
				required={props.required}
			/>
		</div>
	)
}

export default Input
